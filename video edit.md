make adding frame (keyframe) to editor 2 buttons:
addnext
addprev

definitions after adding keyframe to editor ---
viewer_keyframe_position: the framenumber of the keyframe in the viewer
editor_keyframe_position: the framenumber of the keyframe in editor
editor_prev_keyframe_position: the position of the keyframe before this keyframe, in the editor. is 0 if there are no keyframes before this keyframe in the editor
editor_next_position: the position of the keyframe after this keyframe in the editor. is total_frame_length of editor timeline if there are no keyframes before this keyframe in editor.

if addprev
numframes = editor_keyframe_position - editor_prev_keyframe_position
_frames_ = all frames in (viewer_keyframe_position -  numframes)
put  all _frames_ behind editor_keyframe_position in editor 

if addnext
numframes = editor_keyframe_position  + editor_next_keyframe_position
_frames_ = all frames in (viewer_keyframe_position  + numframes)
put  all _frames_ after editor_keyframe_position in editor 
