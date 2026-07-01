# Deliverables

## 1. Transaction code

The order creation flow is implemented as a transactional workflow in both services:

- ORM transaction flow: [src/services/orderOrm.service.ts](src/services/orderOrm.service.ts)
- Raw SQL transaction flow: [src/services/orderRaw.service.ts](src/services/orderRaw.service.ts)

Both flows perform the following steps atomically:
1. Validate the order payload.
2. Lock and validate the wallet.
3. Lock and validate the requested products.
4. Deduct wallet balance.
5. Reduce product stock.
6. Create the order.
7. Insert order items.
8. Commit only if all steps succeed.

## 2. Rollback proof

Rollback is handled explicitly in both implementations:

- In the raw SQL service, the code calls `connection.rollback()` inside the catch block.
- In the Prisma service, the transaction is wrapped in a try/catch and logs that the transaction rolled back when an exception occurs.

A rollback is triggered when any step fails, such as:
- insufficient wallet balance,
- insufficient stock,
- missing product,
- missing wallet,
- or any database error during the transaction.

### Evidence from code
- Raw rollback handler: [src/services/orderRaw.service.ts](src/services/orderRaw.service.ts)
- Prisma rollback handler: [src/services/orderOrm.service.ts](src/services/orderOrm.service.ts)
