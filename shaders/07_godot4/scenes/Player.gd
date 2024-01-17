extends CharacterBody3D

@export var field : TextEdit = null;
@export var mesh : MeshInstance3D = null;

@onready var shaders = [
	preload("res://shaders/tron.gdshader"),
	preload("res://shaders/squares.gdshader"),
	];

@onready var infos = [
	"res://shaders/tron.gdshader",
	"res://shaders/squares.gdshader",
	];
	
var shader_index = 0

const SPEED = 5.0
const JUMP_VELOCITY = 4.5

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")

func _process(delta):
	var prev = 1 if Input.is_action_pressed("my_prev") else 0
	var next = 1 if Input.is_action_pressed("my_next") else 0
	var dir = next - prev;
	var message = ''
	if dir == 1 or dir == -1:
		message = pick_shader(dir)
		field.text = message
	
func pick_shader(index_increment : int) -> String:
	var min : int = 0
	var max : int = len(shaders) - 1
	var new_index = shader_index + index_increment
	new_index = min(max, new_index) # clamp upper.
	new_index = max(min, new_index) # clamp lower.
	var new_shader = null
	var new_message = ""
	if new_index >= min and new_index <= max:
#		print(str(min) + " - " + str(max) + ", " + str(new_index))
		new_shader = shaders[new_index]
		mesh.get_active_material(0).shader = new_shader
		new_message = infos[new_index]
	return new_message
		

func _physics_process(delta):
	# Add the gravity.
	if not is_on_floor():
		velocity.y -= gravity * delta

	# Handle Jump.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var input_dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	if direction:
#		print(direction)
		velocity.x = direction.x * SPEED
		velocity.z = direction.z * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
		velocity.z = move_toward(velocity.z, 0, SPEED)

	move_and_slide()
