// fetch("https://jsonplaceholder.typicode.com/users")
// .then( sovol => sovol.json())
// .then ( sovolKeldi => {
//     console.log(sovolKeldi)
// })

// .catch(error => console.log("xato"))




// fetch("https://jsonplaceholder.typicode.com/users")
// .then( sovol => sovol.json())
// .then ( sovolKeldi => {
//     sovolKeldi.map(element => {
//         const title = document.createElement("h1")
//         title.innerHTML = `${element.username }`
//         document.body.appendChild(title)
//     })
// })

// .catch(error => console.log("xato"))

// const wrapper = document.querySelector(".list")
// const userForm = document.querySelector("#form")
// const userInput = document.querySelector("#inp")


// fetch("https://jsonplaceholder.typicode.com/users")
// .then( sovol => sovol.json())
// .then ( sovolKeldi => {
//     sovolKeldi.map(element => {
//         const title = document.createElement("li")
//         title.innerHTML = `
//         ${element.username }
//         ${element.name}
//         ${element.addres}
//         ${element.email}
//         `
//         document.body.appendChild(title)
//     })
// })

// .catch(error => console.log("xato"))


document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('users-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterButtons = document.querySelectorAll('.filter-button');
    
    let allUsers = [];
    let activeFilter = 'all';
    
 
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            allUsers = users;
            displayUsers(users);
        })
        .catch(error => {
            usersContainer.innerHTML = `
                <div class="error">
                    Error fetching users: ${error.message}. Please try again later.
                </div>
            `;
            console.error('Error fetching users:', error);
        });
    
 
    function displayUsers(users) {
        if (users.length === 0) {
            usersContainer.innerHTML = `
                <div class="no-results">
                    Hech qanday foydalanuvchi topilmadi.
                </div>
            `;
            return;
        }
        
        const userGrid = document.createElement('div');
        userGrid.className = 'user-grid';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <div class="user-name">Ismi: ${user.name}</div>
                <div class="user-info">Username: ${user.username}</div>
                <div class="user-info">Manzil: ${user.address.street}</div>
                <div class="user-info">Email: ${user.email}</div>
            `;
            
            userGrid.appendChild(userCard);
        });
        
        usersContainer.innerHTML = '';
        usersContainer.appendChild(userGrid);
    }
    
  function searchUsers() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayUsers(allUsers);
            return;
        }
        
        let filteredUsers;
        
        if (activeFilter === 'all') {
            filteredUsers = allUsers.filter(user => 
                user.name.toLowerCase().includes(searchTerm) ||
                user.username.toLowerCase().includes(searchTerm) ||
                user.address.street.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        } else if (activeFilter === 'name') {
            filteredUsers = allUsers.filter(user => 
                user.name.toLowerCase().includes(searchTerm)
            );
        } else if (activeFilter === 'username') {
            filteredUsers = allUsers.filter(user => 
                user.username.toLowerCase().includes(searchTerm)
            );
        } else if (activeFilter === 'address') {
            filteredUsers = allUsers.filter(user => 
                user.address.street.toLowerCase().includes(searchTerm)
            );
        } else if (activeFilter === 'email') {
            filteredUsers = allUsers.filter(user => 
                user.email.toLowerCase().includes(searchTerm)
            );
        }
        
        displayUsers(filteredUsers);
    }
    
 
    searchButton.addEventListener('click', searchUsers);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchUsers();
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update active filter
            activeFilter = this.getAttribute('data-field');
            
            // Re-run search with new filter
            searchUsers();
        });
    });
});