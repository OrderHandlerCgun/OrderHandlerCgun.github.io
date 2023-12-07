        var validCodes = {
            'stephisbest': 'Mrs. Stephanie Mcneice',
            'gracexgay': 'Ms. Grace Gay',
            'hearmeoutlmao': 'Mr. Michael Cragun',
            'mygoodbro': 'Mr. Marshall Charley',
            'theagman': 'Mr. Jake Simpson',
            'alvaysbreakin': 'Alviss',
            'hasgonegood': 'Hassaani'
        };

        function setCodeInputValue() {
            var storedName = localStorage.getItem('name');

            if (storedName) {
                document.getElementById('codeInput').value = storedName;

                setTimeout(function () {
                    checkCode();
                }, 3000);
            }
        }

        window.onload = setCodeInputValue;

        function checkCode() {
            var enteredCode = document.getElementById('codeInput').value;
            var welcomeMessage = document.getElementById('welcomeMessage');
            var welcomeMessageText = document.getElementById('welcomeMessageText');

            if (validCodes.hasOwnProperty(enteredCode)) {
                // Get the corresponding name
                var name = validCodes[enteredCode];

                // Display welcome message
                welcomeMessageText.innerHTML = `Welcome ${name}! Please click the button below to start an order.`;
                localStorage.setItem('name', enteredCode);
                welcomeMessage.style.display = 'block';

                googleRetrieve();

            } else {
                alert('Invalid code. Try again.');
            }
        }

        function redirectToPage2() {
            function generateRandomString() {
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var randomString = '';

                for (var i = 0; i < 5; i++) {
                    var randomIndex = Math.floor(Math.random() * characters.length);
                    randomString += characters.charAt(randomIndex);
                }

                return randomString;
            }

            var randomString = generateRandomString();
            localStorage.setItem('OrderKey', randomString);
            window.location.href = 'page2.html';
        }


        class Order {
            constructor(orderNumber, name, shape, size, weight, ms, coat, choice, dimension, orderId, timeLogged, status) {
                this.orderNumber = orderNumber;
                this.name = name;
                this.shape = shape;
                this.size = size;
                this.weight = weight;
                this.ms = ms;
                this.coat = coat;
                this.choice = choice;
                this.dimension = dimension;
                this.orderId = orderId;
                this.timeLogged = timeLogged;
                this.status = status;
            }
        }

        function displayOrders(orders) {
            const ordersContainer = document.getElementById('ordersContainer');
            ordersContainer.innerHTML = '';

            orders.forEach((order) => {
                if (order.dimension === "Canceled") {

                }
                else {
                    const orderRow = document.createElement('div');
                    orderRow.classList.add('order-row');

                    const truncatedShape = order.shape.length > 15 ? order.shape.substring(0, 15) + '...' : order.shape;

                    orderRow.innerHTML = `
                        <p>Order #: ${order.orderNumber};
                        Shape: ${truncatedShape},
                        Size: ${order.size},
                        Weight: ${order.weight},
                        Status: ${order.status}
                   <button onclick="clearOrder('${order.orderNumber}')" class="${order.dimension === "Canceled" ? "buttonCannot" : "buttonCan"}">Cancel</button></p>
                `;
                    ordersContainer.appendChild(orderRow);
                }
            });
        }

        function clearOrder(orderId) {

            var urltoOpen = 'https://script.google.com/macros/s/AKfycbyVmJyW3tMyj1uPyJ_mF0AZrB50YkRqs-kAWb7uESSEI6kug8IkTG8o4Oh6cKY13UKC/exec?id=' + orderId;
            // window.open(urltoOpen, '_blank');
            fetch(urltoOpen)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            setTimeout(function () {
                googleRetrieve();
                alert('Order Canceled!');
            }, 3000);

        }


        function googleRetrieve() {
            const sheetId = "14ZPkJnJGQ7fNA0IITxWmXnFgz1eqn-rP6voC7ikVSYo";
            const sheetName = "Orders";
            const range = "A:L";
            const apiKey = "AIzaSyByVmS9mRHs3K1d_M0WXtGg6QC_1H5lOo4";
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

            const targetName = localStorage.getItem('name');

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const ordersData = data.values.slice(1);
                    const filteredOrders = ordersData
                        .filter((orderRow) => orderRow[1] === targetName)
                        .map((orderRow) => {
                            return new Order(
                                orderRow[0],
                                orderRow[1],
                                orderRow[2],
                                orderRow[3],
                                orderRow[4],
                                orderRow[5],
                                orderRow[6],
                                orderRow[7],
                                orderRow[8],
                                orderRow[9],
                                orderRow[10],
                                orderRow[11]
                            );
                        });
                    displayOrders(filteredOrders);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }