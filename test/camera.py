import sys
import atexit
import time
import picamera

with picamera.PiCamera() as camera:
 # You can set these as you wish, this is what I used for
 # my setup.
 camera.resolution = (320, 240)
 camera.hflip = True
 camera.vflip = True
 camera.framerate = 24
 # Start a preview and let the camera warm up for 2 seconds.
 camera.start_preview()
 time.sleep(2)
 # Start recording, sending the output to stdout as binary.
 camera.start_recording(sys.stdout.buffer, format='mjpeg', resize=(320, 240))
 camera.wait_recording(999999999)
 camera.stop_recording()

 def stop():
  camera.stop_recording()

 atexit.register(stop)