export async function getUserMediaStream(){
  return navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
  })
}

export async function getScreenShareStream(){
  return navigator.mediaDevices.getDisplayMedia({
    video : true
  })
}