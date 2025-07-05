# API
- This folder serves as the controller for all remote calls.
- No other RPC calls should be made that don't reference a file from this folder.
- Implements the mediator pattern to reduce coupling and centralize any bugs coming from remote side effects.

## Subfolders
- Query
    - API calls made using the system in place used for data fetching that should be queried. 
- Services
    - Business logic
- Controller
    - All other single endpoint fetch transactions. No coupling!
- Test
    - Test code for mocking the responses and testing on development servers.
- Util
    - Utility, types, and constants.