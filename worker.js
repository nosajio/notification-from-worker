onmessage = function (event) {
  const {data} = event;
  setTimeout(() => {
    const notification = new Notification('Incoming', {
      body: data.message,
      icon: 'http://loremflickr.com/100/100'
    });
  }, data.delay);
}
