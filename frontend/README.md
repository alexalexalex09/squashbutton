# squashbutton

Buttons that tell you when you pressed them last, and change color if you don't press them often enough

## A React App

### Universal Navigation

1. Menu top left
2. Contains signup, login, logout links
3. Contains help item, links to Helpsite
4. Contains settings

### User Settings

1. Delete Account
2. Local timezone
3. Light/Dark mode
4. Default colors

### Landing Page

1. Centered signup CTA
2. Login link beneath

### App Page

1. Card layout
2. Top left card is "Add New Button" option

#### Cards

1. Main card element is the button
2. Two buttons: History and Settings
3. Button title shown on card
4. Text shows when button was last pressed in local time

#### Button History

1. Lists all button presses, max 1000
2. Option to bulk select and delete history entries

#### Button Settings

1. Edit name
2. Edit button color
3. Edit color changes
4. Move up or down in the order

#### Button color changes

1. Default: no change
2. User can add additional color changes
3. Color picker to choose the color to change to
4. Interval can be specified in minutes, hours, days, weeks, and months

### API

All backend functions accessible as a REST API that authenticates a user
Functions:

1. Get buttons
2. Add new button
3. Get button settings
4. Change button settings
5. Delete buttons
6. Get button history entries
7. Push button history entries
8. Delete button history entries
9. Get user settings
10. Change user settings
