console.log('in the inner script')
setTimeout(() => {
  window.top.postMessage('inner frame is ready')
}, 1000)
