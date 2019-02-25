# Product Definition

### Problem

There are at least 2 parties in a business engagement: the client requesting services and the contractor providing services. Payment flows from the client to the contractor for any given engagement and a specific monetary value is assigned to the services being exchanged.

It is often difficult to determine if the 1st payment will actually occur because both client and contractor must take the time to assess exactly how the services will be rendered:

Contractor unknowns:
- What's the total amount of money the client is willing to pay?
- How many weeks should the services be provided for?
- How many hours per week will it take to deliver the services?

Client unknowns:
- Is the contractor capable of delivering services of an acceptable quality?
- How long will it take the contractor to complete delivery of services?
- How much will it cost me to obtain the deliverables?
- When will I need to pay to ensure services are provided on time?

Provided a framework in which to engage, both client and contractor can manage each other's expectations to properly exchange value. SetBlocks is a software platform designed to enable such a framework using a customizable toolset connecting time management, issue tracking, and budget allocation to set a project pace that is acceptable to both client and contractor.

### User Experience

1. Contractor integrates SetBlocks and deploys a portfolio of work that outlines available services and sets their billable rate for the evaluation phase
2. Client reviews Contractor portfolio and decides to begin the evaluation phase
3. Client initiates a request by providing information about their project requirements which creates a new GitHub project and first issues
4. Contractor is notified of the request and begins tracking time spent reviewing the project requirements
5. Contractor may open a communication channel with the Client to request further information and continues to accrue billable time spent, which is visible to Client throughout the entire evaluation phase
6. To finish the evaluation phase, Client must send a payment to the Contractor that is greater than or equal to the number of hours spent by the Contractor reviewing requirements multiplied by the billable rate
7. To begin the engagement phase, a release proposal will be confirmed by both Client and Contractor and payment will be sent to complete the evaluation phase.

### Release Proposal Mechanics

- Contractor spends time creating a release proposal and includes that as billed work for the first payment that would begin the engagement phase. Contractor should propose a payment that covers their time spent thus far while also committing to additional work that is paid partially upfront.

Example:

Alice wants to build an e-commerce website from scratch and describes her requirements to Bob at a rate of $50/hr. Bob evaluates whether it is worth his time to respond to Alice with a release proposal and decides to spend 5 hours creating the proposal.

Bob delivers the release proposal to Alice that establishes the first 2 project payments:

Payment 1:
- $250 (5 hours of proposal creation @ $50/hr)
- $1000 (20 hours of planning & design @ $50/hr)
- $2000 (20 hours of engineering @ $100/hr)
- TOTAL: $3250

Payment 2: 
- All issues must be closed before this payment is made
- $2000 (20 hours of engineering @ $100/hr)
- $1000 (20 hours of testing & polish $50/hr)
- TOTAL: $3000

After Payment 1 is made, the $250 belongs fully to Bob and the $3000 enters a locked state where Bob must fund all of the proposed issues and complete the work to close those issues to be fully compensated. Alice also commits to match the funding of each issue with funds from Payment 2

Bob assigns funds to the following issues:

| Issue                                 | Budget | Time |
| ------------------------------------- | ------ | ---- |
| 1. Draft preliminary design mocks        | $250  | 5 hours |
| 2. Specify interactive functionality     | $250  | 5 hours |
| 3. Improve design fidelity               | $250  | 10 hours |
| 4. Create UIUX Flowchart                 | $250  | 5 hours |
| 5. Configure development environment     | $500  | 5 hours |
| 6. Build styled UI                       | $1000 | 10 hours |
| 7. Implement functional UX               | $1500 | 15 hours |
| 8. Deploy & debug UX                     | $1000 | 10 hours |
| 9. Polish & optimize UI                  | $750  | 10 hours |
| 10. Document & deliver release package    | $250  | 5 hours |

When Bob decides an issue is complete, he will close the issue via commit message that includes proof that the issue has been completed. Alice will have R hours (default R = 24) to review the issue and request any final changes by re-opening the issue. A 1/2 payment is disbursed immediately upon closing the issue, but the remaining 1/2 will not be disbursed until 24 hours have passed from the close of an issue. If Bob and Alice cannot agree on a closed issue, they can continue closing and re-opening through a continued collaboration until Bob decides to force-close the issue. This would disburse the other 1/2 payment for the issue, but a force-close stays on Bob's activity history for 1 year and may deter future clients from working with him. Bob will also only receive the other 1/2 payment if the $3000 from Payment 1 hasn't already been depleted from closing issues. The maximum Bob can receive from force-closing issues is $3000 and the Client retains access to all work product delivered thus far.

Bob and Alice can agree to change the allocation of issues or the total budget at any time.

Suppose Bob completes issues 1 and 2 and Alice agrees to close both. Bob has earned $500 from the $3000 budget from Payment 1. Alice decides that she may have overestimated the quality of Bob's work and decides that she only wants to spend another $500 on issues 3 and 4 to finish the design and planning work. She respectfully offers this change to Bob which would defund all issues except for 3 and 4.

However, Bob may also realize that he underestimated the amount of time it will take for issues 3 and 4 and gives Alice a counteroffer of $500 on issue 3 and $500 on issue 4. Alice thinks this is reasonable and they both sign off to change the remaining $2500/$3000 budget from Payment 1 to $500/$1000 and continue collaborating until issues 3 and 4 have been closed.

### Pricing

Alice gets 1 free request to a contractor every month. She can then pay $X for each request upto 10 requests per month. Alice can also pay a monthly subscription valued at $X * 10 requests upfront to receive unlimited requests.

Bob pays a Y% development fee on all transactions sent through his Setblocks integration. 

Setblocks is fully open-source and Bob can opt-out of these fee at any time by configuring his integration accordingly and self-hosting the Setblocks data.


### Features

Team Membership
- As a project owner, I want to add a team member (by name) so that I can hire a team
- As a project owner, I want to add multiple team members so that I can trade Setblocks with my team members

Compensated Services
- As a team member, I want to set a billable rate for each block worked so that I can solicit Investors to pay for the services provided during a block
- As an Investor, I want to purchase blocks of work from team members so that I can benefit from services provided










