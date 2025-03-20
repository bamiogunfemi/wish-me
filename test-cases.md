## Test Cases for Birthday Wishes Web Application

### 1. Creating a Birthday Page
- **Test Case 1.1: Successful Birthday Page Creation**
  - Action: Enter valid celebrant name "John Doe" and upload a valid image (< 5MB)
  - Action: Click "Create Birthday Page" button
  - Expected Result: Success message appears and user is redirected to the new birthday page

- **Test Case 1.2: Empty Name Validation**
  - Action: Leave celebrant name field empty and click "Create Birthday Page"
  - Expected Result: Error message "Celebrant name is required" is displayed

- **Test Case 1.3: Oversized Image Upload**
  - Action: Enter valid celebrant name and attempt to upload a 10MB image
  - Expected Result: Error message "Image exceeds 5MB limit" is displayed

- **Test Case 1.4: Invalid Image Format**
  - Action: Enter valid celebrant name and attempt to upload a file that isn't an image (e.g., .pdf)
  - Expected Result: Error message "Only image files (.jpg, .png, .gif) are allowed" is displayed

### 2. Birthday Page Viewing
- **Test Case 2.1: Birthday Page Display**
  - Action: Navigate to a birthday page URL
  - Expected Result: Page loads with celebrant's name and image at the top, followed by any existing wishes

- **Test Case 2.2: Empty Wishes Display**
  - Action: Navigate to a newly created birthday page with no wishes
  - Expected Result: Message "No wishes yet. Be the first to send your wishes!" is displayed

- **Test Case 2.3: Responsive Design Testing**
  - Action: Access birthday page on mobile device (or using responsive design tools)
  - Expected Result: Page layout adjusts appropriately with readable text and properly sized images

### 3. Adding Wishes
- **Test Case 3.1: Successful Wish Submission**
  - Action: Click "Add Wish" button on a birthday page
  - Action: Enter name "Jane Smith" and message "Happy Birthday!"
  - Action: Click "Send Wishes" button
  - Expected Result: Success confirmation appears and new wish displays on the page

- **Test Case 3.2: Wish with Image Upload**
  - Action: Click "Add Wish" button, fill in name and message
  - Action: Upload a valid image and click "Send Wishes"
  - Expected Result: Wish is submitted and displays with the image

- **Test Case 3.3: Empty Name Validation**
  - Action: Click "Add Wish", leave name empty, enter message, click "Send Wishes"
  - Expected Result: Error message "Please enter your name" is displayed

- **Test Case 3.4: Empty Message Validation**
  - Action: Click "Add Wish", enter name, leave message empty, click "Send Wishes"
  - Expected Result: Error message "Please enter your message" is displayed

- **Test Case 3.5: Message Length Validation**
  - Action: Enter very long message (>300 words)
  - Expected Result: Counter shows characters remaining; form prevents submission if over limit

### 4. Email Sharing
- **Test Case 4.1: Valid Email Sharing**
  - Action: Click "Share By Email" button
  - Action: Enter valid email address "friend@example.com"
  - Action: Click "Send Invitation"
  - Expected Result: Success message "Invitation sent!" appears

- **Test Case 4.2: Invalid Email Validation**
  - Action: Click "Share By Email", enter invalid email "notanemail"
  - Action: Click "Send Invitation"
  - Expected Result: Error message "Please enter a valid email address" is displayed

### 5. Birthday Listing
- **Test Case 5.1: List of Birthdays**
  - Action: Navigate to the homepage or birthday list page
  - Expected Result: Grid display of created birthday pages shows with celebrant names and images

- **Test Case 5.2: Wish Count Display**
  - Action: View the birthday listing page
  - Expected Result: Each birthday card displays the correct number of wishes received

- **Test Case 5.3: Birthday Page Navigation**
  - Action: Click on a birthday card
  - Expected Result: User is redirected to that specific birthday page

## Test Data

### Celebrant Data
1. Name: "John Doe", Image: john.jpg (2MB)
2. Name: "Emma Smith", Image: emma.png (3MB)
3. Name: "Michael Johnson", Image: None (using default image)

### Wishes Data
1. Sender: "Jane Smith", Message: "Happy birthday! Wishing you all the best on your special day.", Image: None
2. Sender: "Robert Brown", Message: "Many happy returns! Remember our trip to Paris last year?", Image: paris.jpg (1MB)
3. Sender: "Lisa Wilson", Message: "Congratulations on another trip around the sun!", Image: None
4. Sender: "David Miller", Message: "Happy birthday buddy! Looking forward to celebrating with you this weekend.", Image: cake.jpg (2MB)

### Email Addresses for Testing
1. Valid: friend@example.com
2. Valid: colleague@company.org
3. Invalid: notanemail
4. Invalid: missing@domain

These test cases cover the core functionality of your application with explicit actions and expected results, making them suitable for inclusion in your project documentation.
