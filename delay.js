async function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

export async function randomDelay(timeout) {
  const randomTimeout = Math.floor(Math.random() * timeout)
  console.log('RandomPause :', randomTimeout)
  await delay(randomTimeout)
}
