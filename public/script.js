$(document).ready(function() {
    const socket = io();

    // Form submission
    $('#userForm').submit(function(event) {
        event.preventDefault();

        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            mobileNo: $('#mobileNo').val(),
            emailId: $('#emailId').val(),
            address: {
                street: $('#street').val(),
                city: $('#city').val(),
                state: $('#state').val(),
                country: $('#country').val()
            },
            loginId: $('#loginId').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: '/api/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('User created:', response);
                $('#userForm').trigger('reset');
                alert("User Created successfully")
                socket.emit('joinRoom', response); 
                fetchAndDisplayUsers(); // Refresh the user list
            },
            error: function(error) {
                console.error('Error creating user:', error);
                alert("Error creating user")
            }
        });
    });

    // Receive live user updates
    socket.on('updateLiveUsers', (users) => {
        const userDisplay = $('#userDisplay');
        userDisplay.empty(); // Clear previous results

        // Create the table structure
        const table = $('<table>').addClass("table table-striped table-bordered");;
        const headerRow = $('<tr>');
        headerRow.append($('<th>').text('Name'));
        headerRow.append($('<th>').text('Email'));
        headerRow.append($('<th>').text('Socket ID')); // Add Socket ID column
        table.append(headerRow);

        users.forEach(user => {
            const row = $('<tr>');
            const nameCell = $('<td>').text(`${user.firstName} ${user.lastName}`);
            const emailCell = $('<td>').text(user.emailId);
            const socketIdCell = $('<td>').text(user.socketId); // Add Socket ID cell

            // Click event to fetch user details
            row.on('click', () => {
                $.ajax({
                    url: `/api/users/${user.emailId}`, 
                    type: 'GET',
                    success: function(userData) {
                        showUserPopup(userData); 
                    },
                    error: function(error) {
                        console.error('Error fetching user details:', error);
                        alert("Error fetching user details")
                    }
                });
            });

            row.append(nameCell, emailCell, socketIdCell); // Append cells to the row
            table.append(row); // Append row to the table
        });

        userDisplay.append(table); // Append the table to the userDisplay div
    });

    // Function to display user details in a popup
    function showUserPopup(userData) {
        // ... Create and display a modal or popup with userData ...
        alert(JSON.stringify(userData, null, 4)) // This is to just give an idea, you will have to create modal here
    }

    // Initial fetch of users
    fetchAndDisplayUsers();
});





// $(document).ready(function() {
//     const socket = io();

//     // Form submission
//     $('#userForm').submit(function(event) {
//         event.preventDefault();

//         const formData = {
//             firstName: $('#firstName').val(),
//             lastName: $('#lastName').val(),
//             mobileNo: $('#mobileNo').val(),
//             emailId: $('#emailId').val(),
//             address: {
//                 street: $('#street').val(),
//                 city: $('#city').val(),
//                 state: $('#state').val(),
//                 country: $('#country').val()
//             },
//             loginId: $('#loginId').val(),
//             password: $('#password').val()
//         };

//         $.ajax({
//             url: '/api/users',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(formData),
//             success: function(response) {
//                 console.log('User created:', response);
//                 $('#userForm').trigger('reset');
//                 alert("User Created successfully")
//                 socket.emit('joinRoom', response); 
//                 fetchAndDisplayUsers(); // Refresh the user list
//             },
//             error: function(error) {
//                 console.error('Error creating user:', error);
//                 alert("Error creating user")
//             }
//         });
//     });

//     // Receive live user updates
//     socket.on('updateLiveUsers', (users) => {
//         const userDisplay = $('#userDisplay');
//         userDisplay.empty();

//         users.forEach(user => {
//             const userElement = $('<div>').addClass('user');
//             userElement.append($('<p>').text(`Name: ${user.firstName} ${user.lastName}`));
//             userElement.append($('<p>').text(`Email: ${user.emailId}`));
//             userElement.append($('<p>').text(`Socket ID: ${user.socketId}`));

//             // Click event to fetch user details
//             userElement.on('click', () => {
//                 $.ajax({
//                     url: `/api/users/${user.emailId}`, // Fetch by email or socket ID
//                     type: 'GET',
//                     success: function(userData) {
//                         showUserPopup(userData); // Function to display popup
//                     },
//                     error: function(error) {
//                         console.error('Error fetching user details:', error);
//                         alert("Error fetching user details")
//                     }
//                 });
//             });

//             userDisplay.append(userElement);
//         });
//     });

//     // Function to display user details in a popup
//     function showUserPopup(userData) {
//         // ... Create and display a modal or popup with userData ...
//         alert(JSON.stringify(userData, null, 4)) // This is to just give an idea, you will have to create modal here
//     }

//     // Initial fetch of users
//     fetchAndDisplayUsers();
// });
