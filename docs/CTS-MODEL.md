# CTS reconstruction: calculation scope

This document describes only the synthetic web model. It contains no company data, ledger accounts, client identities, connection strings or original workbook values.

## Reference review and limits

The supplied PDF and workbook were inspected read-only. The review covered worksheet formulas, cross-sheet references, pivot caches and external query definitions. Several input tables are cached outputs of external queries; their upstream calculation logic is not present in the workbook. The dashboard reconstructs the visible financial formulas and documented allocation criteria. It does not claim to reproduce missing SQL logic or the company's full operational model.

All amounts, periods, locations, business-unit names, channel names, areas, drivers and populations in the application are synthetic and generated in code. The financial year and currency are illustrative. The source attachments are not copied into the repository or deployment.

## Financial identities

- Net sales = gross sales − returns − discounts + service revenue.
- Net cost = gross cost − returned cost − purchase discounts + service invoices + document differences − sales-expense provision.
- Net margin amount = net sales − net cost; margin rate = net margin / net sales.
- Assigned expenses = direct + indirect + retained corporate expenses in the selected perspective.
- CTS = assigned expenses / net sales.
- Contribution amount = net margin − assigned expenses; contribution rate = contribution amount / net sales.
- Ratios use sums of amounts, never sums or unweighted averages of percentages. A zero denominator produces an unavailable rate, not a zero rate.

## Perspectives and reconciliation

Business-unit view includes two anonymous distribution units, a shared-service unit and corporate. Channel and distribution-center views cover only Distribution A, matching the narrower operational scope of the reference approach. The scope is displayed beside the dashboard filters. The Distribution A unit total reconciles to both detailed perspectives. Other operations retain amounts outside the named location/channel groups instead of dropping them.

The unit view treats operating expenses as direct to their owning business unit. Shared operating support and warehouse reception appear as indirect in channel/center detail. The amount is unchanged by reclassification. Corporate expenses stay on the no-revenue corporate row and are not spread using an undocumented rule. The corporate CTS denominator is total business revenue for the same periods. Services have no merchandise cost and therefore a 100% pre-expense margin.

Net cost and margin at the synthetic channel/center grain are distributed using the unit revenue mix, preserving the documented weighted-margin principle. This is an illustrative application of the visible principle, not a recovery of missing query calculations.

## Allocation criteria

- Direct attribution: tagged operating personnel and dedicated freight are assigned to their known operation.
- Location sales: district-management expenses use the sales of the served locations only.
- Floor area: shared warehouse occupancy first splits between two operating units using independently invented areas.
- Reception/dispatch: the eligible shared operation splits 50/50. Reception is shared operating support. Dispatch is distributed across wholesale, retail and transfer groups using an adjusted sales mix; synthetic supplier-direct shipments reduce the transfer driver.
- Scoped sales: common operating support is distributed only inside its eligible unit.
- Service transfer: the documented 80% shared-service expense reclassification is represented as equal negative and positive expense entries between the operating and shared-service units. It does not create extra expense or reduce net sales.
- Corporate retention: corporate pools have no business-unit sales allocation.

Every pool is allocated in integer cents by signed largest remainder. Rounding conserves every source pool exactly. Allocation denominators are computed for the entire month and eligible scope **before** UI filters. Selecting one location never reallocates another location's expense to it.

## Verification

Automated tests cover known financial fixtures, signed/zero-driver allocations, pool conservation, component-to-source reconciliation, area and reception/dispatch splits, service offsets, zero denominators, corporate revenue base, perspective reconciliation, monthly grouping and channel/center filter combinations. Existing warehouse analytics tests remain in place.
