timeline that shows markeers


viewer position
editor position

after adding keyframe to editor ---
keyframe_position: the position this keyframe was added to
prev_keyframe_position: the position of the keyframe before this keyframe. is 0 if there are no keyframes before this keyframe
editor next position: the position of the keyframe after this keyframe. is 0 if there are no keyframes before this keyframe

if addlast
numframes = keyframe_position - prev_keyframe_position
frames = viewer_position -  numframes
take viewer-position