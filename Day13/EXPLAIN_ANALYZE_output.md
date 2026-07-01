# Database Query Performance Comparison

This document analyzes and compares the performance profiles of two database queries executed against the `orders` table using `EXPLAIN ANALYZE`. The evaluation focuses on query execution plans, timing metrics, database roundtrips, and index usage.

---

## 1. Raw Execution Plan Outputs

### Query A: Filtering by Amount (Unindexed Column)
```sql
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE totalAmount > 500.00 ORDER BY createdAt DESC;
```

**Output:**
```text
-> Sort: orders.createdAt DESC  (cost=0.35 rows=1) (actual time=0.0251..0.0251 rows=0 loops=1)
    -> Filter: (orders.totalAmount > 500.00)  (cost=0.35 rows=1) (actual time=0.0197..0.0197 rows=0 loops=1)
        -> Table scan on orders  (cost=0.35 rows=1) (actual time=0.0192..0.0192 rows=0 loops=1)
```

### Query B: Filtering by User ID (Using Composite Index)
```sql
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE userId = 105 ORDER BY createdAt DESC;
```

**Output:**
```text
-> Index lookup on orders using idx_orders_user_created (userId=105)  (cost=0.35 rows=1) (actual time=0.03..0.03 rows=0 loops=1)
```

---

## 2. Metric-by-Metric Analysis

### 📊 Index Usage
* **Query A**: **None.** The plan explicitly states `Table scan on orders`. Because `totalAmount` lacks an index, the database engine is forced to read every single row physically stored on disk.
* **Query B**: **Optimal.** The engine performs a highly targeted `Index lookup` utilizing the custom composite index `idx_orders_user_created`. It targets the specific node pointer instantly.

### 🗺️ Query Plan Complexity
* **Query A**: Requires a **3-step nested operation** read from the inside out:
  1. `Table scan`: Read all data rows.
  2. `Filter`: Discard records where `totalAmount <= 500.00`.
  3. `Sort`: Perform an expensive in-memory "filesort" operation to order remaining data by `createdAt DESC`.
* **Query B**: Requires a **1-step flat operation**. The `Filter` and `Sort` steps are entirely eliminated. The data structure within the composite index naturally stores rows pre-sorted by `userId` and `createdAt DESC`.

### ⏱️ Execution Time (Actual Time)
* **Query A**: The overall total execution time is `0.0251 ms`.
* **Query B**: The overall total execution time is `0.0300 ms`.
* *Note on Scale*: While these numbers look identical in an empty test database (`rows=0`), **Query A's execution time will grow linearly ($O(N)$)** as data accumulates. **Query B will maintain a flat, near-constant timeline ($O(\log N)$)** regardless of whether the table holds 100 rows or 10,000,000 rows.

---

## 3. Final Performance Summary

| Metric | Query A (Unindexed) | Query B (Indexed: `idx_orders_user_created`) | Winner |
| :--- | :--- | :--- | :--- |
| **Index Used** | None (`Table scan`) | `idx_orders_user_created` | **Query B** |
| **Sorting Cost** | High (In-memory filesort) | Zero (Pre-sorted on disk) | **Query B** |
| **Complexity** | 3-step Pipeline | 1-step Instant Lookup | **Query B** |
| **Scalability** | Degrades with table size ($O(N)$) | Exceptionally Stable ($O(\log N)$) | **Query B** |

### Conclusion
The addition of the two-column composite index `idx_orders_user_created` successfully safeguards the user order history feature. It eliminates CPU-heavy sorting tasks and prevents full-table scanning behavior in production environments.
