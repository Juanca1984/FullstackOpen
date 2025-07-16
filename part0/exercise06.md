sequenceDiagram
    participant Browser
    participant Server

    Note right of Browser: User fills the form and clicks "Add Note" button

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note\n(Form data in request body)
    activate Server
    Server->>Server: Add new note to notes array
    Server-->>Browser: 200 OK (or success response)
    deactivate Server

    Note right of Browser: Browser runs JavaScript callback after POST success

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: Updated notes JSON (including the new note)
    deactivate Server

    Note right of Browser: Browser renders updated notes list without full page reload
