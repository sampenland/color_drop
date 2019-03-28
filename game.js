//------------------------------------------------------------------------------
//                                   MAIN GAME
//------------------------------------------------------------------------------
// ------------------------------------------------
// Color Drop
// spinland games 2018
// Written by: Sam Penland
// ------------------------------------------------ 
class ColorDrop extends Phaser.Game {
 
    constructor(screen_width, screen_height) {
        
        // Create game
        super(screen_width, screen_height, Phaser.CANVAS, 'ColorDrop');

        this.state.add('Boot', new BootState(this), false);
        this.state.add('MainMenu', new MainMenuState(this, screen_width, screen_height), false);
        this.state.start('Boot');

    }

}

// -----------------------------------------
// Boot State
// This state is where scaling happenings
// -----------------------------------------
class BootState extends Phaser.State{

    constructor(game){

        super();
        this.game = game;
    }

    create(){
     
        // Scaling, sizing
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVeritcally = true;

        // When resizing, resize game
        window.addEventListener('resize', this.resize_game, this);

        // Show startup ad
        if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                gdsdk.showBanner();
        }

        // Start game
        this.start_app();
        
    }

    start_app(){

        // Goto main menu -> (state, clear world, clear cache)
        this.state.start('MainMenu', true, true);

    }

    resize_game() {
        this.game.stage.scale.setShowAll();
        this.game.stage.scale.refresh();
    }

}

// -----------------------------------------
// Main Menu State
// This state is 
// -----------------------------------------
class MainMenuState extends Phaser.State{

    constructor(game, screen_width, screen_height){

        super();
        this.game = game;
        this.screen_width = screen_width;
        this.screen_height = screen_height;

        this.Color_Gray = 0x0E4749;
        this.Color_Light_Gray = 0xC1BDB3;
        this.Color_Black = 0x312F2F;
        this.Color_Dark_Purple = 0xC6D8FF;
        this.Color_Lightest_Blue = 0xC6D8FF;

    }

    preload(){

    }

    create(){
              
        // Changeable values
        var using_particles = true;

        // Setup default main state
        var states = this.state;
        var main_state = new Main(this.game, this.screen_width, this.screen_height, 1, 4, 6000);

        // Create default Main State
        this.state.add('Main', main_state, false);

        // Background color
        this.game.stage.backgroundColor = this.Color_Gray;

        // Title background
        this.title_background = this.game.add.graphics(0, 0);
        this.title_background.beginFill(this.Color_Lightest_Blue, 1);
        this.title_background.lineStyle(1, this.Color_Lightest_Blue);
        this.title_background.drawRect(0, 0, this.screen_width, this.screen_height * 0.2);
        this.title_background.endFill();

        this.title_text = { font: "150px Arial", fill: "#312f2f", align: "center" };
        this.title = this.game.add.text(this.game.world.centerX, this.screen_height * 0.1, "Color Drop", this.title_text);
        this.title.anchor.set(0.5);

        this.company_text = { font: "24px Arial", fill: "#312f2f", align: "center" };
        this.company = this.game.add.text(this.game.world.centerX, this.screen_height * 0.16, "spinland games", this.company_text);
        this.company.anchor.set(0.5);

        // Instructions background
        this.title_background = this.game.add.graphics(0, this.screen_height * 0.2);
        this.title_background.beginFill(this.Color_Black, 1);
        this.title_background.lineStyle(1, this.Color_Black);
        this.title_background.drawRect(0, 0, this.screen_width, this.screen_height * 0.2);
        this.title_background.endFill();

        this.title_background = this.game.add.graphics(0, this.screen_height * 0.2 * 2);
        this.title_background.beginFill(this.Color_Gray, 1);
        this.title_background.lineStyle(1, this.Color_Gray);
        this.title_background.drawRect(0, 0, this.screen_width, this.screen_height * 0.2 * 2);
        this.title_background.endFill();   
        
        // Instructions
        this.instructions_text = {font: "55px Arial", fill: "#C1BDB3", align: "left"};
        this.instructions = this.game.add.text(this.screen_width * 0.045, this.screen_height * 0.21, 
            "Bounce colored Drop into it's matching\ncolored goal. Use Power Drop to\ngather Drops on screen. Then tap it\nto explode for more points.", this.instructions_text);
        this.instructions.anchor.set(0);

        // Casual Game Button
        this.casual_game = this.game.add.graphics(0, this.screen_height * 0.21);
        this.casual_game.beginFill(this.Color_Dark_Purple, 1);
        this.casual_game.lineStyle(1, this.Color_Dark_Purple);
        this.casual_game.drawRoundedRect(0, 0, this.screen_width * 0.7, this.screen_height * 0.05);
        this.casual_game.endFill();

        this.btn_casual = this.game.add.sprite(this.screen_width * 0.15, this.screen_height * 0.25, '');
        this.btn_casual.addChild(this.casual_game);
        this.btn_casual.inputEnabled = true;
        this.btn_casual.events.onInputUp.add(function(){
            
            // Setup game
            main_state.set_starting_required_streak(4);
            main_state.set_starting_drop_generation_time(6000);
            main_state.set_starting_time(30);
            main_state.set_particles(using_particles);
            main_state.set_drawn_line_fade_speed(0.055);

            // Start game
            states.start('Main', true, true);

        });

        this.casual_text = {font: "40px Arial", fill: "#312f2f", align: "center"};
        this.casual_button = this.game.add.text(this.game.world.centerX, this.screen_height * 0.485, "Casual Game", this.casual_text);
        this.casual_button.anchor.set(0.5);

        // Advanced Game Button
        this.advanced_game = this.game.add.graphics(0, this.screen_height * 0.21);
        this.advanced_game.beginFill(this.Color_Dark_Purple, 1);
        this.advanced_game.lineStyle(1, this.Color_Dark_Purple);
        this.advanced_game.drawRoundedRect(0, 0, this.screen_width * 0.7, this.screen_height * 0.05, 10);
        this.advanced_game.endFill();

        this.btn_advanced = this.game.add.sprite(this.screen_width * 0.15 , this.screen_height * 0.35, '');
        this.btn_advanced.addChild(this.advanced_game);
        this.btn_advanced.inputEnabled = true;
        this.btn_advanced.events.onInputUp.add(function(){
            
            // Setup game
            main_state.set_starting_required_streak(7);
            main_state.set_starting_drop_generation_time(4000);
            main_state.set_starting_time(30);
            main_state.set_gravity(200);
            main_state.set_particles(using_particles);
            main_state.set_drawn_line_fade_speed(0.095);

            // Start game
            states.start('Main', true, true);

        });

        this.advanced_text = {font: "40px Arial", fill: "#312f2f", align: "center"};
        this.advanced_button = this.game.add.text(this.game.world.centerX, this.screen_height * 0.585, "Advanced Game", this.advanced_text);
        this.advanced_button.anchor.set(0.5);

        // Expert Game Button
        this.expert_game = this.game.add.graphics(0, this.screen_height * 0.21);
        this.expert_game.beginFill(this.Color_Dark_Purple, 1);
        this.expert_game.lineStyle(1, this.Color_Dark_Purple);
        this.expert_game.drawRoundedRect(0, 0, this.screen_width * 0.7, this.screen_height * 0.05, 10);
        this.expert_game.endFill();

        this.btn_expert = this.game.add.sprite(this.screen_width * 0.15 , this.screen_height * 0.45, '');
        this.btn_expert.addChild(this.expert_game);
        this.btn_expert.inputEnabled = true;
        this.btn_expert.events.onInputUp.add(function(){
            
            // Setup game
            main_state.set_starting_required_streak(12);
            main_state.set_starting_drop_generation_time(3000);
            main_state.set_gravity(240);
            main_state.set_particles(using_particles);
            main_state.set_drawn_line_fade_speed(0.125);

            // Start game
            states.start('Main', true, true);

        });

        this.expert_text = {font: "40px Arial", fill: "#312f2f", align: "center"};
        this.expert_button = this.game.add.text(this.game.world.centerX, this.screen_height * 0.685, "Expert Game", this.advanced_text);
        this.expert_button.anchor.set(0.5);

        // Particles On/Off Button
        this.particles_area = this.game.add.graphics(0, 0);
        this.particles_area.beginFill(this.Color_Dark_Purple, 1);
        this.particles_area.lineStyle(1, this.Color_Dark_Purple);
        this.particles_area.drawRoundedRect(0, 0, this.screen_width * 0.8, this.screen_height * 0.1, 10);
        this.particles_area.endFill();

        this.btn_particles = this.game.add.sprite(this.screen_width * 0.1, this.screen_height * 0.85, '');
        this.btn_particles.addChild(this.particles_area);
        this.btn_particles.inputEnabled = true;
        this.btn_particles.events.onInputUp.add(function(){
            
            // Setup game
            if(using_particles){
                particles_display.setText("Particles OFF");
                using_particles = false;
            }
            else{
                particles_display.setText("Click Here For Old Phones");
                using_particles = true;
            }

        });

        // Particle on/off
        this.particles_text = {font: "55px Arial", fill: "#312f2f", align: "center"};
        var particles_display = this.game.add.text(this.game.world.centerX, this.screen_height * 0.9, "Tap Here For Older Phones", this.particles_text);
        particles_display.anchor.set(0.5);

    }

    update(){

    }

}

// -----------------------------------------
// Main Game State
// Sets up game and plays 
// -----------------------------------------
class Main extends Phaser.State{

    constructor(game, screen_width, screen_height, starting_level, starting_required_streak, starting_drop_generation_time){

        super();
        this.game = game;

        this.Debug = false;
        
        this.Color_Blue = 0x00bfb3;
        this.Color_Green = 0x0dab76;
        this.Color_Brown = 0x764134;
        this.Color_Yellow = 0xfffc31;
        this.Color_Black = 0x312f2f;
        this.Color_Tan = 0xdbb68f;
        this.Color_Purple = 0x525174;
        this.Color_Power_Drop = 0xA4036F;
        this.Color_Power_Drop_Special = 0xBF1A2F;
        this.Color_Pink = 0xE9AFA3;

        // Controllers
        this.Game_Controller;
        this.Goal_Controller;
        this.Drop_Generator;
        this.Line_Drawer;
        this.Power_Drop_Controller;
        this.Level_Controller;

        this.Background_Drawer

        this.Game_Started = false;
        this.Game_Variables = [0, 20];
        this.Label_Group;

        this.starting_level = starting_level;
        this.starting_required_streak = starting_required_streak;
        this.starting_drop_generation_time = starting_drop_generation_time;

        this.Screen_Width = screen_width;
        this.Screen_Height = screen_height;

        // Physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 130;

        // Particles
        this.using_particles = true;
        this.line_draw_fade_speed = 0.055;  

        // Limit hold time
        this.timing_hold;
        this.hold_timer;

        // Used for drawing lines. When a line
        // has been held for too long
        this.held_too_long = false;

    }

    set_drawn_line_fade_speed(value){
        this.drawn_line_fade_speed = value;
    }

    set_starting_time(time_in_seconds){
        this.Game_Variables[1] = time_in_seconds;
    }

    set_particles(are_on){
        this.using_particles = are_on;
    }

    set_gravity(value){
        this.game.physics.p2.gravity.y = value;
    }

    set_starting_level(level){
        this.starting_level = level;
    }

    set_starting_required_streak(required_streak){
        this.starting_required_streak = required_streak;
    }

    set_starting_drop_generation_time(time){
        this.starting_drop_generation_time = time;
    }

    preload(){


        this.game.load.audio('drop_creation_sound', 'assets/drop_creation.mp3');

    }

    create(){

        // Sounds
        this.sound_drop_creation = this.game.add.audio('drop_creation_sound');

        // Game time
        this.time_text_style = { font: "65px Arial", fill: "#312f2f", align: "center" };
        this.game_time = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.Game_Variables[1].toString(), this.time_text_style);
        this.game_time.anchor.set(0.5);

        this.score_text_style = { font: "75px Arial", fill: "#312f2f", align: "center" };
        this.game_score = this.game.add.text(this.game.world.centerX, this.Screen_Height * 0.1, this.Game_Variables[0].toString(), this.score_text_style);
        this.game_score.anchor.set(0.5);

        this.level_text_style = { font: "75px Arial", fill: "#dbb68f", align: "center" };
        this.level_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - (this.Screen_Height * 0.25), "Level " + this.starting_level.toString(), this.level_text_style);
        this.level_text.anchor.set(0.5);
        this.level_text.alpha = 0;

        this.constant_level_text_style = { font: "45px Arial", fill: "#312f2f", align: "center" };
        this.constant_level_text = this.game.add.text(this.Screen_Width * 0.95, this.Screen_Height * 0.025, "1", this.constant_level_text_style);
        this.constant_level_text.anchor.set(0.5);

        // Add all labels to a group so that they can
        // be brought to the top over everything else
        this.Label_Group = this.game.add.group()
        this.Label_Group.add(this.game_time);
        this.Label_Group.add(this.game_score);
        this.Label_Group.add(this.level_text);
        this.Label_Group.add(this.constant_level_text);

        // Create game controller
        this.Game_Controller = new GameController(this.game, this.Game_Variables, this.game_time, this.game_score);

        // Link sounds to game controller
        this.Game_Controller.set_drop_creation_sound(this.sound_drop_creation);

        // Create drop generator
        this.Drop_Generator = new DropGenerator(this.Screen_Width, this.Screen_Height, this.Color_Blue, this.Color_Black, 
                                                this.Screen_Width * 0.7, 0, this.game, this.Game_Controller);
        this.Drop_Generator.set_speed_constant(0.2)
        this.Drop_Generator.set_drop_time(this.starting_drop_generation_time);

        // Link drop generator to game controller
        this.Game_Controller.set_drop_generator(this.Drop_Generator);               

        // Set background
        this.game.stage.backgroundColor = this.Color_Blue;
        this.Background_Drawer = this.game.add.graphics(0,0);

        // Goal Controller
        this.Goal_Controller = new GoalController(this.Screen_Width, this.Screen_Height, this.Screen_Width * 0.07,
                                            this.Screen_Height * 0.07, this.Color_Green, this.Color_Brown, 
                                            this.Color_Yellow, this.Color_Black, this.Color_Tan, this.Color_Purple, 
                                            this.game, this.Game_Controller);

        // Level controller
        this.Level_Controller = new LevelController(this.starting_level, this.level_text, this.constant_level_text, this.Goal_Controller, this.game, this.Game_Controller);

        // Link level controller to game controller
        this.Game_Controller.set_level_controller(this.Level_Controller);
        this.Game_Controller.set_particles(this.using_particles);

        // Power drop controller
        this.Power_Drop_Controller = new PowerDropController(this.Goal_Controller, this.Drop_Generator, this.game, this.Game_Controller, this.starting_required_streak);
        
        // Link Power Drop Controller to Drop Generator
        this.Drop_Generator.set_power_drop_controller(this.Power_Drop_Controller);
        
        // Link goal controller to game controller
        this.Game_Controller.set_goal_controller(this.Goal_Controller);

        // Create instance to draw lines
        this.Line_Drawer = new LineDrawer(this.Color_Tan, this.Color_Black, 12, this.game, this.Game_Controller);
        
        // Set fade speed
        this.Line_Drawer.set_drawn_line_fade_speed(this.drawn_line_fade_speed);

        // Link line drawer to drop generator
        this.Drop_Generator.set_line_drawer_controller(this.Line_Drawer);

        // Setup inputs
        this.game.input.onTap.add(this.click_or_tap, this);
        this.game.input.onUp.add(this.reset_current_dragging, this);

        // Limit hold time
        this.timing_hold = false;
        this.hold_timer = this.game.time.create(false);

    }

    click_or_tap (pointer) {

        // Click and Tap event
        this.Drop_Generator.check_click_on_drop(pointer.position.x, pointer.position.y);

    }

    hold_and_draw (pointer) {

        if(this.held_too_long) return;

        if(!this.timing_hold){
            this.hold_timer.add(1500, this.lift_finger, this);
            this.hold_timer.start();
        }

        // Add points to current line
        this.Line_Drawer.add_point_to_current_line(pointer.position.x, pointer.position.y);

        // Draw the current line being drawn
        this.Line_Drawer.draw_current_line();
        
    }

    lift_finger(){

        // Clear all current dragging points
        this.held_too_long = true;
        this.Line_Drawer.add_current_line();
        this.hold_timer.stop();
        this.timing_hold = false;

    }

    reset_current_dragging () {

        // Clear all current dragging points
        this.held_too_long = false;
        this.Line_Drawer.add_current_line();
        this.hold_timer.stop();
        this.timing_hold = false;

    }

    update() {

        // Pole pointer for hold,
        // so that ponts can be added
        if(this.game.input.activePointer.isDown){
            this.hold_and_draw(this.game.input.activePointer);
        }

        // Draw all lines
        this.Line_Drawer.draw_all_lines();

        // Draw goals
        this.game.world.bringToTop(this.Goal_Controller.get_goals_group());

        // Draw all drops
        this.Drop_Generator.update_drops(this.Goal_Controller);

        // Bring labels to top
        this.game.world.bringToTop(this.Label_Group);                      

    }

}

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//                                GAME CLASSES
// -----------------------------------------------------------------------------
// Game Object
//------------------------------------
// This is the base class for all objects.
// It creates a basic drawer to be used, if
// needed, and also hold a reference to the 
// game object which is needed for any type
// of adding Phaser objects to the game. 
// -----------------------------------------------------------------------------
class GameObject {

    constructor(game, game_controller) 
    {
        // Main game holders
        this.drawer = game.add.graphics(0, 0);
        this.game = game;
        this.game_controller = game_controller;

        // Features
        this.visible = true;
        this.paused = false;

        // Colors
        this.Color_Blue = 0x00bfb3;
        this.Color_Green = 0x0dab76;
        this.Color_Brown = 0x764134;
        this.Color_Yellow = 0xfffc31;
        this.Color_Black = 0x312f2f;
        this.Color_Tan = 0xdbb68f;
        this.Color_Purple = 0x525174;
        this.Color_Power_Drop = 0xA4036F;
        this.Color_Power_Drop_Special = 0xBF1A2F;
        this.Color_Light_Blue = 0x99B2DD;
        this.Color_Dark_Purple = 0x443742;

        this.Color_Blue_RGB = [0,191,179]
        this.Color_Green_RGB = [13,171,118];
        this.Color_Brown_RGB = [118,65,52];
        this.Color_Yellow_RGB = [255,252,49];
        this.Color_Black_RGB = [49,47,47];
        this.Color_Tan_RGB = [219,182,143];
        this.Color_Purple_RGB = [82,81,116];
        this.Color_Power_Drop_RGB = [164,3,111];
        this.Color_Power_Drop_Special_RGB = [191,26,47];
        this.Color_Light_Blue_RGB = [153,178,221];

    }

    set_paused(value){
        this.paused = value;
    }

    get_paused(){
        return this.paused;
    }

    set_visible(value){
        this.visible = value;
    }

    get_visible(){
        return this.visible;
    }

    get_color_rgb(color) {

        var color_rgb = null;

        switch(color){

            case this.Color_Brown:
                color_rgb = this.Color_Brown_RGB;
                break;
            case this.Color_Green:
                color_rgb = this.Color_Green_RGB;
                break;
            case this.Color_Purple:
                color_rgb = this.Color_Purple_RGB;
                break;
            case this.Color_Yellow:
                color_rgb = this.Color_Yellow_RGB;
                break;
            case this.Color_Tan:
                color_rgb = this.Color_Tan_RGB;
                break;
            case this.Color_Power_Drop:
                color_rgb = this.Color_Power_Drop_RGB;
                break;
            case this.Color_Power_Drop_Special:
                color_rgb = this.Color_Power_Drop_Special_RGB;
                break;

        }

        return color_rgb;

    }
    
}

// -----------------------------------------------------------------------------
// Particle Emitter
//-------------------------
// Class made to create bitmap data
// which is need to make non-sprite
// particles.
// -----------------------------------------------------------------------------
class ParticleEmitter extends GameObject {

    constructor(position_vector, particle_size, particle_color, is_explosion, particle_count, life_span, 
        gravity_vector, start_alpha, end_alpha, fade_rate_ms, game, game_controller) 
    {

        super(game, game_controller);
                
        // If not using particles skip all this
        if(!game_controller.get_using_particles()){
            this.dead = true;
            return;
        }

        // Postition data
        this.position_vector = new Phaser.Point(position_vector.x, position_vector.y);

        // Number of particles to make
        this.particle_count = particle_count;

        // Life time
        this.life_span = life_span;

        // Emitter alive/dead
        this.dead = false;

        // Bitmap data
        this.particle = game.add.bitmapData(particle_size, particle_size);
        this.particle.fill(particle_color[0], particle_color[1], particle_color[2]);

        // Create emitter and setup the particle it will make
        this.emitter = game.add.emitter(this.position_vector.x, this.position_vector.y, 100);
        this.emitter.gravity.x = gravity_vector.x;
        this.emitter.gravity.y = gravity_vector.y;
        this.emitter.setAlpha(start_alpha, end_alpha, fade_rate_ms);
        this.emitter.makeParticles(this.particle);
        
        // Enact system
        if(is_explosion){
            this.explode();
        }
        else{
            this.start_emission();
        }
        
    }

    start_emission() {

        if(!this.game_controller.get_using_particles()){
            return;
        }

        // Starts emitting and doesn't stop
        // Important to only call this once
        this.emitter.start(false, this.life_span, this.particle_count);

    }

    explode(){

        if(!this.game_controller.get_using_particles()){
            return;
        }

        // Explode
        this.emitter.start(true, this.life_span, null, this.particle_count);

        // Remove explosion after set
        this.game.time.events.add(this.life_span, this.die, this);

    }

    die() {

        if(!this.game_controller.get_using_particles()){
            return;
        }

        // Remove emitter and mark self as dead
        this.particle.destroy();
        if(this.emitter != null && !this.dead){
            this.emitter.destroy();   
        }
        this.dead = true;

    }

    get_alive(){
        return !this.dead;
    }

    update_position(position_vector) {

        if(this.dead) return;

        if(!this.game_controller.get_using_particles()){
            return;
        }

        // Do not update positions on explosions
        if(this.is_explosion) return;

        // Else - update the position
        this.emitter.x = position_vector.x;
        this.emitter.y = position_vector.y;

    }
    
}

// -----------------------------------------------------------------------------
// Drop gameobject
// ---------------------------
// The gameobject is the drop. It simply
// has a update command and clicked command
// which are called by DropGenerator
// -----------------------------------------------------------------------------
class Drop extends GameObject {

    constructor(blocker_drop, drop_generator, position_vector, radius, color, power_drop_controller, game, game_controller) 
    {
        
        // Set drawer and create gameobject
        super(game, game_controller)
        this.dead = false;

        // Set it as blocker if needed
        this.blocker_drop = blocker_drop;

        // Linking
        this.drop_generator = drop_generator;
        this.power_drop_controller = power_drop_controller;

        // Set size and color
        this.radius = radius;
        this.color = color

        // Power drop in play
        this.power_drop_in_play = null;

        // Get RBG color
        this.color_rgb = this.get_color_rgb(this.color);        

        // Draw self
        this.drawer.beginFill(this.color, 1);
        this.drawer.lineStyle(1, this.color);
        this.drawer.drawCircle(0, 0, this.radius); 

        // Create body and enable physics
        this.rigidbody = game.add.sprite(position_vector.x, position_vector.y, this.drawer.generateTexture()); 
        this.drawer.destroy();
        this.game.physics.p2.enable(this.rigidbody, false);
        this.rigidbody.body.setCircle(radius/2);
        if(blocker_drop)this.rigidbody.body.kinematic = true;

        // Create particle trail
        if(!blocker_drop){

            // Particle trail
            this.particle_trail = new ParticleEmitter(this.get_position_vector(), 12, this.color_rgb, false, 4, 250, new Phaser.Point(0,0), 1, 0, 250, game, game_controller);
            // // Start particle trail
            this.particle_trail.start_emission();
        }
        

        // Setup explosion sizes
        this.large_explosion_size = 22;
        this.small_explosion_size = 8;

        // Cost of goals
        this.time_reward = 6;
        this.time_punishment = -3;

        // Special power drop
        this.special_power_drop = null;
        this.reacting_to_special_power_drop = false;

        if(this.color == this.Color_Power_Drop_Special){

            // Remove all blockers
            this.drop_generator.set_special_power_drop();

        }
        else{
            this.special_power_drop = this.drop_generator.get_special_power_drop();
        }

        // Creation sound
        if(this.game_controller.get_sounds_enabled() && !blocker_drop){
            this.game_controller.play_drop_creation();
        }

    }

    power_drop_destruction(is_special){
        
        // Destroy all drops
        this.drop_generator.destroy_all_drops(true, is_special);

    }

    // Draws drop on screen
    update(){

        // If not dead continue
        if(this.dead) return;

        // If blocker skip this
        if(this.blocker_drop) return;

        if(this.special_power_drop != null && !this.reacting_to_special_power_drop){
            this.reacting_to_special_power_drop = true;
            this.game.physics.p2.createSpring(this.rigidbody.body, this.special_power_drop.rigidbody.body, 0, 15, 1);
        }

        // Show particle trail if enabled
        if(this.game_controller.get_using_particles()){

            // Update particle trail
            this.particle_trail.update_position(this.get_position_vector());
            
        }

        // Destory dead particle systems
        if(this.particle_trail != null){
            if(!this.particle_trail.get_alive()){
                this.particle_trail  = null;
            }
        }
        if(this.small_explosion != null){
            if(!this.small_explosion.get_alive()){
                this.small_explosion = nulll
            }
        }
        if(this.large_explosion != null){
            if(!this.large_explosion.get_alive()){
                this.large_explosion = null;
            }
        }        
        
    }

    get_alive(){
        return !this.dead;
    }

    add_addition_speed(velocity_y){
        this.rigidbody.body.velocity.y += velocity_y;
    }

    get_position_vector() {

        // If not dead continue
        if(this.dead) return;

        return new Phaser.Point(this.rigidbody.body.x, this.rigidbody.body.y);
    }

    set_special_power_drop(drop){
        this.special_power_drop = drop;
    }

    clicked() {

        // If not dead continue
        if(this.dead) return;

        // If blocker, skip
        if(this.blocker_drop) return;

        if(this.color == this.Color_Power_Drop){

            // Destroy all drops
            this.power_drop_destruction(false);

            // If over level 5 then blockers can be removed
            var current_level = this.game_controller.get_current_level();
            if( current_level > 9){
                this.game_controller.remove_a_blocker();
            }

        }
        else if(this.color == this.Color_Power_Drop_Special){
            
            // Clear special power
            this.drop_generator.clear_special_power_drop();
            
            // Destroy all drops
            this.power_drop_destruction(true);
        }
        else{

            // Normal ball action
            // Shoot upwards
            this.rigidbody.body.velocity.y = -350;

        }

    }

    die_on_matching_goal() {

        // If not dead continue
        if(this.dead) return;

        // If blocker, skip
        if(this.blocker_drop) return;

        // Add to power streak
        this.power_drop_controller.add_to_streak(this.color);

        // Add to score and time
        this.game_controller.game_update_score_on_screen(500);
        this.game_controller.game_update_time_on_screen(this.time_reward);

        // Large explosion
        var large_explosion = new ParticleEmitter(this.get_position_vector(), this.large_explosion_size, this.color_rgb, true, 15, 1000, new Phaser.Point(0,0), 1, 0, 1000, this.game, this.game_controller);
        large_explosion.explode();

        // Cleanup
        this.die();

    }

    die_on_non_matching_goal(goal_color_rgb) {

        // If not dead continue
        if(this.dead) return;

        // If blocker, skip
        if(this.blocker_drop) return;

        // Clear power streak
        this.power_drop_controller.clear_streak();

        // Lose seconds (punishment!)
        this.game_controller.game_update_time_on_screen(this.time_punishment);

        // Smaller explosion
        var small_explosion = new ParticleEmitter(this.get_position_vector(), this.small_explosion_size, goal_color_rgb, true, 20, 1500, new Phaser.Point(0,0), 1, 0, 2000, this.game, this.game_controller);
        small_explosion.explode();

        // Clean up
        this.die();

    }

    die(explode_on_death, special) {

        if(this.game_controller.get_using_particles()){
            this.particle_trail.die();
        }

        // If special power drop, clear drop generator's ref
        if(this.color == this.Color_Power_Drop_Special){
            this.drop_generator.clear_special_power_drop();
        }

        // If blocker, skip
        if(this.blocker_drop) return;

        // If a special power drop was clicked 
        // do same function as power drop but different color
        if(special){
            explode_on_death = true;
        }

        if(explode_on_death){

            // Large explosion
            var part_color = this.color_rgb;
            if(special){
                part_color = this.Color_Power_Drop_Special_RGB;
            }
            var large_explosion = new ParticleEmitter(this.get_position_vector(), 12, part_color, true, 12, 850, new Phaser.Point(0,0), 1, 0, 850, this.game, this.game_controller);
            large_explosion.explode();

            // Added 1000 score for each drop on screen
            // and add 8 seconds for each drop
            var increase_score_by = 1000;
            if(special) increase_score_by = 1600;
            this.game_controller.game_update_score_on_screen(increase_score_by);
            this.game_controller.game_update_time_on_screen(3);

        }

        // Clean up
        this.dead = true;
        this.rigidbody.destroy();

    }

    remove_blocker(){

        // Clean up
        this.dead = true;
        this.rigidbody.destroy();

    }
    
}

// -----------------------------------------------------------------------------
// DropGenerator gameobject
//-------------------------------
// This game object creates the drops at a
// random X on screen. It also checks for
// clicks on drops which add force/velocity
// to the drop. Also, this gameobject updates
// the graphics object of each drop so that
// they display at correct position on screen.
// -----------------------------------------------------------------------------
class DropGenerator extends GameObject {

    constructor(max_width, max_height, background_color, line_color, side_padding, y, game, game_controller){

        // Setup drawer (may be unused)
        super(game, game_controller);
        this.power_drop_controller = null;
        this.line_drawer_controller = null;

        // Setup for generator
        this.max_width = max_width;
        this.max_height = max_height;
        this.background_color = background_color;
        this.line_color = line_color;
        this.side_padding = side_padding;
        this.y = y;
        this.enabled = true;
        this.speed_constant = 0.2;

        // Array for all drops
        this.drops = [];

        // Creation Timer
        this.create_drop_timer = this.game.time.create(false);
        
        // Drop generation timer, gives 3 seconds before starting
        // then starts. create_drop is the event which is called
        // and that event will reset timer to a random number of
        // seconds.
        this.create_drop_timer.add(3000, this.create_drop, this);
        this.create_drop_timer.start();

        // Setup variables for power streaks
        this.power_streak = false;
        this.power_streak_special = false;

        // Max time between drops
        this.drop_time = 6000;

        // Special drop
        this.special_power_drop = null;

        // Timer for special power drops
        this.special_power_drop_timer = this.game.time.create(false);
        
    }

    get_special_power_drop(){
        return this.special_power_drop;
    }

    set_special_power_drop(){

        // Give all drop the rigidbody of the special
        // power drop for the spring
        this.drops.forEach(drop => {
            drop.set_special_power_drop(this.special_power_drop);
        });
    }

    clear_special_power_drop(){
        this.special_power_drop = null;
    }

    reduce_drop_time(positive_delta){
        this.drop_time -= positive_delta;
    }

    set_drop_time(time){
        this.drop_time = time;
    }

    set_power_drop_controller(controller){
        this.power_drop_controller = controller;
    }

    set_line_drawer_controller(controller){
        this.line_drawer_controller = controller;
    }

    enable_power_drop(special) {

        this.power_streak = true;
        this.power_streak_special = special;

    }

    set_speed_constant(c){

        this.speed_constant = c;

    }

    set_enabled(value){
        this.enabled = value;
    }

    create_drop(){

        if(!this.game_controller.is_game_clock_running()){
            this.game_controller.start_game_clock();
        }

        if(!this.enabled) return;

        // Get random X
        var drop_x = this.game.rnd.integerInRange(this.side_padding, this.max_width - this.side_padding);

        // Get random color
        var color_rnd = this.game.rnd.integerInRange(0, 10);

        var rnd_color;
        if(color_rnd < 2){
            rnd_color = this.Color_Brown;
        }
        else if(color_rnd < 4){
            rnd_color = this.Color_Green;
        }
        else if(color_rnd < 6){
            rnd_color = this.Color_Purple;
        }
        else if(color_rnd < 8){
            rnd_color = this.Color_Yellow;
        }
        else{
            rnd_color = this.Color_Tan;
        }

        // Create a new drop
        var create_position = new Phaser.Point(drop_x, this.y);

        // Create the drop
        var drop;

        // If power streak reached
        if(this.power_streak){

            // If it's a special one
            if(this.power_streak_special){

                // Special power drop
                drop = new Drop(false, this, create_position, 50, this.Color_Power_Drop_Special, this.power_drop_controller, this.game, this.game_controller);
                drop.add_addition_speed(50);
                this.special_power_drop = drop;
                this.power_streak = false;
                this.power_streak_special = false;

            }
            else{

                // Power drop
                drop = new Drop(false, this, create_position, 50, this.Color_Power_Drop, this.power_drop_controller, this.game, this.game_controller);
                this.power_streak = false;
                this.power_streak_special = false;

            }

            // Clear the streak
            this.power_drop_controller.clear_streak();

        }
        else{

            // Create normal drops
            drop = new Drop(false, this, create_position, 50, rnd_color, this.power_drop_controller, this.game, this.game_controller);

        }
                
        // Add drop to array/list
        this.drops.push(drop);

        // Reset timer
        // Adjust speed based on remaining time
        this.create_drop_timer.add(this.game.rnd.integerInRange(1000, this.drop_time), this.create_drop, this);
        this.create_drop_timer.start();

    }

    check_click_on_drop(pointer_x, pointer_y) {

        if(!this.enabled) return;

        for(var i = 0; i < this.drops.length; i++){

            // For each drop in drops
            // check if clicked using 
            // radius to make bouding box
            var drop = this.drops[i];
            var pos = drop.get_position_vector();

            if(pointer_x > (pos.x - drop.radius) &&
               pointer_x < (pos.x + drop.radius) &&
               pointer_y > (pos.y - drop.radius) &&
               pointer_y < (pos.y + drop.radius))
               {
                   drop.clicked();
                   break;
               }

        }

    }

    get_drops() {
        
        if(!this.enabled) return;

        var drop_colliders = [];
        
        this.drops.forEach(drop => {
            drop_colliders.push(drop.rigidbody);            
        });

        return drop_colliders;

    }

    destroy_all_drops(explode_on_death, special) {

        this.drops.forEach(drop => {
            drop.die(explode_on_death, special);
        });

        this.drops = [];

        // If explode_on_death (called from power drop action)
        // then reset line drawer
        this.line_drawer_controller.reset();

    }

    update_drops(goal_controller) {

        if(!this.enabled) return;

        // Simply loop through drops and draw on screen
        // and check for goal collisons. Also, we have
        // to keep track of drops that have collided with
        // a goal and need to be removed

        var drop_index = 0;
        var remove_indices = []

        this.drops.forEach(drop => {

            if(drop.get_alive()){

                // Update position
                drop.update();

                // Check for colliding with goals
                var colliding_goal_color = goal_controller.check_for_colliding_goal(drop);

                if(colliding_goal_color != null){

                    // Collided with goal
                    if(colliding_goal_color == drop.color){
                        drop.die_on_matching_goal();
                    }
                    else{
                        drop.die_on_non_matching_goal(this.get_color_rgb(colliding_goal_color));
                    }

                    // Enact drops die (will have particle effect/explosion)
                    remove_indices.push(drop_index);

            }

            }
            else{
                remove_indices.push(drop_index);
            }

            drop_index += 1;

        });

        // Remove any drops that have collided
        remove_indices.forEach(index => {

            // Remove
            if(this.drops != null){

                if(this.drops.length > index){

                    if(this.drops[index] != null){
                        
                        if(this.drops[index].rigidbody != null){
                            this.drops[index].rigidbody.destroy();
                        }
                        
                        if(this.drops.length > index){
                            this.drops.splice(index, 1);
                        }
                    }
                    

                }

            }
            

        });

    }

}

// -----------------------------------------------------------------------------
// LineDrawer gameobject
//--------------------------------
// This gameobject draws the current line 
// being drawn and all previous lines that
// were drawn, also fades lines until they
// are no longer visible
// -----------------------------------------------------------------------------
class LineDrawer extends GameObject {

    constructor(drawing_line_color, drawn_line_color, line_thickness, game, game_controller){

        // Setup drawer (may be unused)
        super(game, game_controller);

        // Colors for lines
        this.drawing_line_color = drawing_line_color;
        this.drawn_line_color = drawn_line_color;

        // Thickness
        this.line_thickness = line_thickness;

        // X,Y point values for currently drawn line
        this.current_drawing_points = [];
        this.current_line_static_body = this.game.add.sprite(0,0,'');
        this.game.physics.p2.enable(this.current_line_static_body, false);
        this.current_line_static_body.body.kinematic = true;
        this.current_line_static_body.body.clearShapes();

        // Previous lines array of array of points [points/vectors for each segment, points/vectors for each segment]
        //                                           line 1                              line 2
        this.previous_lines = [];
        this.previous_lines_thickness = [];

        // Graphics drawers to draw previous lines
        this.previous_line_drawers = [];

        // Static bodies for collisions
        this.previous_line_colliders = []
        this.staticbody_radius = 10;
        
        // Fade speed
        this.drawn_line_fade_speed = 0.055;

    }

    set_drawn_line_fade_speed(value){
        this.drawn_line_fade_speed = value;
    }

    draw_current_line(){

        var from_x;
        var from_y;
        var to_x;
        var to_y;

        if(this.current_drawing_points.length > 2){
            
            from_x = this.current_drawing_points[this.current_drawing_points.length-2].x
            from_y = this.current_drawing_points[this.current_drawing_points.length-2].y

            to_x = this.current_drawing_points[this.current_drawing_points.length-1].x
            to_y = this.current_drawing_points[this.current_drawing_points.length-1].y
            
            this.drawer.lineStyle(this.line_thickness, this.drawing_line_color);
            this.drawer.moveTo(from_x, from_y);
            this.drawer.lineTo(to_x, to_y);

            // Create static bodies between two points
            this.current_line_static_body.body.clearShapes();
            this.create_line_static_bodies(this.current_drawing_points, true);

        }        

    }

    draw_all_lines(){

        // Start on line # 1
        var current_line = 0;

        // Array for lines that need to be
        // removed because they have faded away
        var remove_indices = [];

        this.previous_lines.forEach(line => {

            // Fade thickness by fade speed and remove if totally
            // faded.
            if(this.previous_lines_thickness[current_line] < 0){
                // Mark for removal
                remove_indices.push(current_line);
            }
            else{

                // Fade some
                this.previous_lines_thickness[current_line] -= this.drawn_line_fade_speed;

                // Get this line's drawer and clear line
                var drawer = this.previous_line_drawers[current_line];
                drawer.clear();
                
                // Loop through all points and draw each line segment
                for(var i = 1; i < line.length; i++){

                    var from_x = line[i-1].x
                    var from_y = line[i-1].y
                    var to_x = line[i].x
                    var to_y = line[i].y

                    // Draw segment
                    drawer.lineStyle(this.previous_lines_thickness[current_line], this.drawn_line_color);
                    drawer.moveTo(from_x, from_y);
                    drawer.lineTo(to_x, to_y);

                }

            }            

            // Increase to next line
            current_line += 1;

        });

        // Remove faded lines
        remove_indices.forEach(index => {

            this.remove_line_at_index(index);

        });

    }

    add_point_to_current_line(x ,y){

        var pos = new Phaser.Point(x, y);
        this.current_drawing_points.push(pos);
    }

    add_current_line() {

        // Skip if no points are on line
        if(this.current_drawing_points.length<1){
            return;
        }

        // If more than 4 lines then
        // delete oldest line and draw
        // new one
        if(this.previous_lines.length>4){
            
            this.remove_line_at_index(0);

        }

        // Remove all duplicate points
        var used_points = [];
        var new_line_points = [];
        this.current_drawing_points.forEach(point => {

            var point_id = point.x/point.y;
            if(used_points.indexOf(parseFloat(point_id)) == -1){
                used_points.push(point_id);
                new_line_points.push(point);
            }

        });
        this.current_drawing_points = new_line_points;

        // Remove all points too close together(based on
        // static body size variale)
        new_line_points = [];
        var last_point = this.current_drawing_points[0];
        for(var i = 1; i < this.current_drawing_points.length; i++){

            var point = this.current_drawing_points[i-1];
            var next_point = this.current_drawing_points[i];

            if(last_point.distance(next_point) < this.staticbody_radius){
                continue;
            }
            last_point = point;
            new_line_points.push(point);

        }
        this.current_drawing_points = new_line_points;
        
        // If line is all the same point, meaning
        // the scrren was tap/clicked instead of
        // held. This should fix the issue with
        // clicking/tapping creating a static body.
        // Clicking or tapping should only shoot drop
        // not create a line.
        var create = false;
        var line = this.current_drawing_points;
        for(var i = 1; i < line.length; i++){

            var from_x = Math.round(line[i-1].x);
            var from_y = Math.round(line[i-1].y);
            var to_x = Math.round(line[i].x);
            var to_y = Math.round(line[i].y);

            if(from_x != to_x || from_y != to_y){
                create = true;
            }

        }

        // If just a point then do not continue
        if(!create) {
            
            this.clear_current_line();

            return;
            
        };

        // Add current line into previous lines
        var drawer = this.game.add.graphics(0, 0);

        //  Add to previous line holders
        this.previous_line_drawers.push(drawer);
        this.previous_lines.push(this.current_drawing_points);
        this.previous_lines_thickness.push(this.line_thickness);

        // Create static bodies for the line 
        this.create_line_static_bodies(this.current_drawing_points);

        // Clear old line
        this.clear_current_line();

    }

    clear_current_line(){

        // Clear points so drawer is ready
        // for next line draw
        this.drawer.clear();
        this.current_drawing_points = []

        // Clear static bodies
        this.current_line_static_body.body.clearShapes();

    }

    reset(){

        // Clear previous lines
        for(var i = 0; i<this.previous_lines.length;i++){
            
            // Remove each line
            this.remove_line_at_index(i);
        }

        // Clear current line as well
        this.clear_current_line();

    }

    create_line_static_bodies(points, is_current_line) {

        // If previous liine, create new body
        // if current line then add to current body

        if(!is_current_line){

            // Create the static body for the line
            var line_static_body = this.game.add.sprite(0,0,'');
            this.game.physics.p2.enable(line_static_body, false);
            line_static_body.body.kinematic = true;
            line_static_body.body.clearShapes();
        }        

        // Brad's funky Vector partitioning method
        // which allows for thicking the line so that
        // there are no gapes in quickly drawn lines
        for(var i = 1; i < points.length; i++){

            var p1 = points[i-1];
            var p2 = points[i];

            var partitions = p1.distance(p2)/this.staticbody_radius;
            var n = 1;

            var creating_points = true;
            // Keep from infinite looping if cannot find point after 100 attempts
            var fail_count = 0;
            while(creating_points && fail_count < 100){
                
                if(p1.distance(p2) > this.staticbody_radius){

                    if(is_current_line){
                        this.current_line_static_body.body.addCircle(this.staticbody_radius, p1.x, p1.y);
                    }
                    else{
                        line_static_body.body.addCircle(this.staticbody_radius, p1.x, p1.y);
                    }
                    

                    p1 = this.get_next_partition_point(p1, p2, partitions, n);

                    n += 1;

                }
                else{

                    if(is_current_line){
                        this.current_line_static_body.body.addCircle(this.staticbody_radius, p1.x, p1.y);
                    }
                    else{
                        line_static_body.body.addCircle(this.staticbody_radius, p1.x, p1.y);
                    }
                    
                    creating_points = false;
                }

                fail_count++;
                
            }

        }

        // Add to holder for previous line static bodies
        if(!is_current_line){

            this.previous_line_colliders.push(line_static_body);

        }

    }

    get_next_partition_point(p1, p2, partitions, n){

        var x = (((partitions - n) * p1.x) + (n * p2.x)) / partitions;
        var y = (((partitions - n) * p1.y) + (n * p2.y)) / partitions;
        return new Phaser.Point(x, y);

    }

    get_colliders() {
        return this.previous_line_colliders;
    }
    
    remove_line_at_index(index){

        // Removes from previous lines
        this.previous_lines.splice(index, 1);
        this.previous_lines_thickness.splice(index, 1);
        this.previous_line_drawers[index].destroy();
        this.previous_line_drawers.splice(index, 1);
        
        // Destory colliders
        this.previous_line_colliders[index].destroy();
        this.previous_line_colliders.splice(index, 1);

    }

}

// -----------------------------------------------------------------------------
// Goal controller gameobject
//------------------------------
// This gameobject is used to draw goals and
// check if drops collid with the goals
// -----------------------------------------------------------------------------
class GoalController extends GameObject {

    constructor(screen_width, screen_height, side_padding,
        bottom_goal_height, color_green, color_brown, 
        color_yellow, color_black, color_tan, color_purple, 
        game, game_controller){

        // Setup drawer (may be unused)
        super(game, game_controller);

        // Get screen size
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.side_padding = side_padding;
        this.bottom_goal_width = (screen_width - (2 * side_padding)) / 3;
        this.bottom_goal_height = bottom_goal_height;

        // Get all colors
        this.color_green = color_green;
        this.color_brown = color_brown;
        this.color_yellow = color_yellow;
        this.color_black = color_black;
        this.color_tan = color_tan;
        this.color_purple = color_purple;

        // Set goals to initial colors
        this.goal_left_color = this.color_purple;
        this.goal_right_color = this.color_yellow;
        this.goal_bottom_left_color = this.color_tan;
        this.goal_bottom_center_color = this.color_green;
        this.goal_bottom_right_color = this.color_brown;

        // Setup goal positions dynamically
        // on screen and then draw them
        this.goal_left = game.add.graphics(0, screen_height * 0.5);
        this.goal_right = game.add.graphics(screen_width - side_padding, screen_height * 0.5);
        this.goal_bottom_left = game.add.graphics(side_padding, screen_height - bottom_goal_height);
        this.goal_bottom_center = game.add.graphics(side_padding + this.bottom_goal_width, screen_height - bottom_goal_height);
        this.goal_bottom_right = game.add.graphics(side_padding  + (2 * this.bottom_goal_width), screen_height - bottom_goal_height);

        // Draw goals
        this.goal_left.lineStyle(1, this.goal_left_color);
        this.goal_left.beginFill(this.goal_left_color, 1);
        this.goal_left.drawRect(0, 0, side_padding, screen_height);

        this.goal_right.lineStyle(1, this.goal_right_color);
        this.goal_right.beginFill(this.goal_right_color, 1);
        this.goal_right.drawRect(0, 0, side_padding, screen_height);

        this.goal_bottom_left.lineStyle(1, this.goal_bottom_left_color);
        this.goal_bottom_left.beginFill(this.goal_bottom_left_color, 1);
        this.goal_bottom_left.drawRect(0, 0, this.bottom_goal_width, screen_height);

        this.goal_bottom_center.lineStyle(1, this.goal_bottom_center_color);
        this.goal_bottom_center.beginFill(this.goal_bottom_center_color, 1);
        this.goal_bottom_center.drawRect(0, 0, this.bottom_goal_width, screen_height);

        this.goal_bottom_right.lineStyle(1, this.goal_bottom_right_color);
        this.goal_bottom_right.beginFill(this.goal_bottom_right_color, 1);
        this.goal_bottom_right.drawRect(0, 0, this.bottom_goal_width, screen_height);

        this.all_goals = this.game.add.group();
        this.all_goals.add(this.goal_left);
        this.all_goals.add(this.goal_right);
        this.all_goals.add(this.goal_bottom_left);
        this.all_goals.add(this.goal_bottom_center);
        this.all_goals.add(this.goal_bottom_right);

    }

    get_goals_group(){
        return this.all_goals;
    }

    get_screen_width(){
        return this.screen_width;
    }

    get_screen_height(){
        return this.screen_height;
    }

    get_side_padding(){
        return this.side_padding;
    }

    // Check each goal for collision with drop
    // and return that goals color
    check_for_colliding_goal(drop){

        // Check for a collision with a goal
        var drop_pos = drop.get_position_vector();
        
        // -- Goal Left
        if(drop_pos.x > this.goal_left.x &&
            drop_pos.x < this.goal_left.x + this.side_padding &&
            drop_pos.y > this.goal_left.y &&
            drop_pos.y < this.screen_height)
        {
            return this.goal_left_color;
        }

        // -- Goal Right
        if(drop_pos.x > this.goal_right.x &&
            drop_pos.x < this.goal_right.x + this.side_padding &&
            drop_pos.y > this.goal_right.y &&
            drop_pos.y < this.screen_height)
        {
            return this.goal_right_color;
        }

        // -- Goal Bottom Left
        if(drop_pos.x > this.goal_bottom_left.x &&
            drop_pos.x < this.goal_bottom_left.x + this.bottom_goal_width &&
            drop_pos.y > this.goal_bottom_left.y &&
            drop_pos.y < this.screen_height)
        {
            return this.goal_bottom_left_color;
        }

        // -- Goal Bottom Center
        if(drop_pos.x > this.goal_bottom_center.x &&
            drop_pos.x < this.goal_bottom_center.x + this.bottom_goal_width &&
            drop_pos.y > this.goal_bottom_center.y &&
            drop_pos.y < this.screen_height)
        {
            return this.goal_bottom_center_color;
        }

        // -- Goal Bottom Right
        if(drop_pos.x > this.goal_bottom_right.x &&
            drop_pos.x < this.goal_bottom_right.x + this.bottom_goal_width &&
            drop_pos.y > this.goal_bottom_right.y &&
            drop_pos.y < this.screen_height)
        {
            return this.goal_bottom_right_color;
        }

        // If not colliding then return no color
        return null;

    }

}

// -----------------------------------------------------------------------------
// Game controller gameobject
//------------------------------
// This gameobject is used to keep scoring and time
// -----------------------------------------------------------------------------
class GameController extends GameObject{

    constructor(game, game_variables, time_label_ref, score_label_ref){

        super(game);
        this.game_variables = game_variables;
        this.drop_generator = null;
        this.goal_controller = null;
        this.level_controller = null;

        // game variables:
        //  [0] - Score
        this.score_label_ref = score_label_ref;
        //  [1] - Time
        this.time_label_ref = time_label_ref;

        // Create timer which ticks for game time (in seconds)
        this.game_timer = game.time.create(false);
        this.game_timer.add(1000, this.game_tick, this);
        this.game_clock_running = false;

        // If game time is lower than 5 seconds
        this.game_running_out = false;

        // If using particles or not
        this.using_particles = true;

        // Sounds
        this.sounds_enabled = true;
        this.sound_drop_creation;

    }

    set_sounds_enabled(value){
        this.sounds_enabled = value;
    }

    get_sounds_enabled(){
        return this.sounds_enabled;
    }

    set_drop_creation_sound(sound){
        this.sound_drop_creation = sound;
    }

    play_drop_creation(){
        this.sound_drop_creation.play();
    }

    set_particles(are_on){
        this.using_particles = are_on;
    }

    start_game_clock(){
        this.game_timer.start();
        this.game_clock_running = true;
    }

    get_using_particles(){
        return this.using_particles;
    }

    is_game_clock_running(){
        return this.game_clock_running;
    }

    set_drop_generator(drop_generator){
        this.drop_generator = drop_generator;
    }

    get_drop_generator(){
        return this.drop_generator;
    }

    set_level_controller(controller){
        this.level_controller = controller;
    }

    get_level_controller(){
        return this.level_controller;
    }

    remove_a_blocker(){
        this.level_controller.remove_a_blocker();
    }

    get_current_level(){
        return this.level_controller.get_level();
    }

    reduce_drop_generator_drop_time(positive_delta){
        this.drop_generator.reduce_drop_time(positive_delta);
    }

    set_goal_controller(goal_controller){
        this.goal_controller = goal_controller;
    }

    remove_all_blockers(){
        this.level_controller.remove_all_blockers();
    }

    get_time(){
        return this.game_variables[1];
    }

    get_score(){
        return this.game_variables[0];
    }

    get_game_running_out(){
        return this.game_running_out;
    }

    update_background(){

        // Change game background to pink if
        // running out of time
        if(this.game_variables[1] < 6){

            this.game_running_out = true;
            this.game.stage.backgroundColor = this.Color_Light_Blue;

        }
        else{

            if(this.game.stage.backgroundColor != this.Color_Blue){
                
                this.game_running_out = false;
                this.game.stage.backgroundColor = this.Color_Blue;

            }

        }

    }

    game_tick() {

        // Subtract a second
        this.game_variables[1] -= 1;

        this.update_background();

        // Show on screen
        this.game_update_time_on_screen(0);

        if(this.game_variables[1] < 1){

            // End the game
            this.game_over();
            return;

        }

        // Reset tick
        this.game_timer.add(1000, this.game_tick, this);

    }

    game_update_time_on_screen(change_in_time){

        // Update text on screen for time
        this.game_variables[1] += change_in_time;
        if(this.game_variables[1] > 30) this.game_variables[1] = 25;

        // Update background 
        this.update_background();

        // Keep from seeing negative numbers
        if(this.game_variables[1] < 0) this.game_variables[1] = 0;

        this.time_label_ref.setText(this.game_variables[1].toString());

    }

    game_update_score_on_screen(change_in_score){

        this.game_variables[0] += change_in_score;
        this.score_label_ref.setText(this.game_variables[0].toString());

    }

    game_over() {

        // Game over screen
        this.time_label_ref.setText("GAME OVER");
        this.drop_generator.set_enabled(false);
        this.drop_generator.destroy_all_drops(false);

        if(!this.using_particles) return;

        var left_pos = new Phaser.Point(this.goal_controller.get_screen_width() * 0.001, 0);
        var right_pos = new Phaser.Point(this.goal_controller.get_screen_width() * 0.999, 0);

        var emitter_left = new ParticleEmitter(left_pos, 8, this.get_color_rgb(this.goal_controller.goal_left_color), false, 30, 3000, new Phaser.Point(100,350), 1, 0, 3000, this.game,this);
        emitter_left.start_emission();

        var emitter_right = new ParticleEmitter(right_pos, 8, this.get_color_rgb(this.goal_controller.goal_right_color), false, 30, 3000, new Phaser.Point(-100,350), 1, 0, 3000, this.game,this);
        emitter_right.start_emission();

        // Create buttons
        // Restart
        this.restart = this.game.add.graphics(0, this.goal_controller.get_screen_height() * 0.21);
        this.restart.beginFill(this.Color_Dark_Purple, 1);
        this.restart.lineStyle(1, this.Color_Dark_Purple);
        this.restart.drawRect(0, 0, this.goal_controller.get_screen_width(), this.goal_controller.get_screen_height() * 0.05);
        this.restart.endFill();

        this.btn_restart = this.game.add.sprite(0 , this.goal_controller.get_screen_height() * 0.35, '');
        this.btn_restart.addChild(this.restart);
        this.btn_restart.inputEnabled = true;
        this.btn_restart.events.onInputUp.add(function(){
            
            // Start game
            location.reload();

        });

        this.restart_text = {font: "40px Arial", fill: "#C1BDB3", align: "center"};
        this.restart_button = this.game.add.text(this.game.world.centerX, this.goal_controller.get_screen_height() * 0.585, "Restart Game", this.restart_text);
        this.restart_button.anchor.set(0.5);

        // Add score
        this.add_score = this.game.add.graphics(0, this.goal_controller.get_screen_height() * 0.21);
        this.add_score.beginFill(this.Color_Dark_Purple, 1);
        this.add_score.lineStyle(1, this.Color_Dark_Purple);
        this.add_score.drawRect(0, 0, this.goal_controller.get_screen_width(), this.goal_controller.get_screen_height() * 0.05);
        this.add_score.endFill();

        this.btn_add_score = this.game.add.sprite(0 , this.goal_controller.get_screen_height() * 0.45, '');
        this.btn_add_score.addChild(this.add_score);
        this.btn_add_score.inputEnabled = true;
        var score = this.game_variables[0];
        this.btn_add_score.events.onInputUp.add(function(){
            
            // Goto new html page
            var player = window.prompt("Enter you name:","Guest");
            var score_form = document.forms['score_form'];
            score_form.elements["player"].value = player;
            score_form.elements["score"].value = score;
            score_form.submit();

        });

        this.add_score_button_text = {font: "40px Arial", fill: "#C1BDB3", align: "center"};
        this.add_score_button = this.game.add.text(this.game.world.centerX, this.goal_controller.get_screen_height() * 0.685, "Add My Score to the Leaderboard", this.add_score_button_text);
        this.add_score_button.anchor.set(0.5);


    }    
}

// -----------------------------------------------------------------------------
// Power Drop Controller gameobject
//------------------------------
// This gameobject keeps drop streak and enables power if 
// drop steak of X is achieved
// -----------------------------------------------------------------------------
class PowerDropController extends GameObject{

    constructor(goal_controller, drop_generator, game, game_controller, required_streak){

        super(game, game_controller);

        // Link to goal controller so we can
        // get screen width and height and also
        // screen padding
        this.goal_controller = goal_controller;

        // Link to drop generator
        this.drop_generator = drop_generator;

        // Total number of streaks made so far
        this.total_streaks = 0;
        
        // Set start number of good goal matching that
        // enables streak goal (int)
        this.required_streak = required_streak;

        // Limit require streak to 6
        if(this.required_streak > 6) this.required_streak = 6;

        this.streak_count = 0;

        // Variables for keeping track of current streak
        // - this keeps track of the previous colors that
        // make up the sreak
        this.current_streak = [];

        // Create vector array to hold positions of each
        // drop in current streak
        this.container_vectors = [];

        // Variable if power drop is ready
        this.streak_reached = false;

        // Y Position of Power Drop streak display
        this.y = this.goal_controller.get_screen_height() * 0.025;

        // Draw dispaly
        this.draw_streak();

        // Start with special streak enabled
        this.special_streak_enabled = true;

    }

    draw_streak(){

        // Create array to hold container positons
        this.container_vectors = [];

        // Clear all previous drawn shapes
        this.drawer.clear();

        // Draw the containers
        var radius = this.goal_controller.get_screen_width() * 0.03;
        var padding = radius;

        var x = padding;
        for(var i = 0; i < this.required_streak; i++){

            x += padding;

            this.drawer.beginFill(this.Color_Black, 1);
            this.drawer.lineStyle(1, this.Color_Black);
            this.drawer.drawCircle(x, this.y, radius);

            this.container_vectors.push(new Phaser.Point(x, this.y));
            
            x += radius;

        }

        // Draw current streak
        var container_index = 0;
        this.current_streak.forEach(drop_color => {

            // Put drop in streak
            this.drawer.beginFill(drop_color, 1);
            this.drawer.lineStyle(1, drop_color);
            this.drawer.drawCircle(this.container_vectors[container_index].x, this.container_vectors[container_index].y, radius);

            container_index += 1;

        });

    }

    limit_streak(){

        // Limit require streak to 6
        if(this.required_streak > 6) this.required_streak = 6;

    }

    add_to_streak(drop_color){

        // If new drop is less than required streak
        // drops then add it, if not then set the 
        // streak reached
        if(this.current_streak.length < this.required_streak){
            
            // A the drop color to streak
            this.current_streak.push(drop_color);

            // Redraw streak
            this.draw_streak();

            // Show small explosion
            var small_explosion = new ParticleEmitter(this.container_vectors[this.current_streak.length-1], 8, 
                                                    this.get_color_rgb(this.current_streak[this.current_streak.length-1]), 
                                                    true, 12, 1000, new Phaser.Point(0,0), 1, 0, 1000, this.game, 
                                                    this.game_controller);
            small_explosion.explode();

            // If new addition makes streak
            if(this.current_streak.length >= this.required_streak){

                this.streak_was_reached();

            }

        }
        else{

            // Streak was reached
            this.streak_was_reached();

        }
        
        // See if special streak
        if(this.special_streak_enabled && this.current_streak.length > 2){
            
            // Loop through streak and see if 3 of the 
            // same color are in a row
            var special_reached = false;
            var old_color = this.current_streak[0];
            var special_count = 1;
            for(var i = 1; i < this.current_streak.length; i ++){

                if(old_color == this.current_streak[i]){
                    special_count += 1;
                }
                else{
                    special_count = 1;
                    old_color = this.current_streak[i];                    
                }

                if(special_count > 2){
                    special_reached = true;
                }

            }

            if(special_reached){

                // Special was reached, so wait until clear streak
                // for reset
                this.special_streak_enabled = false;

                // Tell drop generator to drop the power drop
                this.drop_generator.enable_power_drop(true);

            }
            
        }

    }

    streak_was_reached(){

        // Don't allow streaks to be reach if
        // they are already reached (this keeps,
        // the drop before power drop from triggering
        // the streak reached again)
        if(this.streak_reached) return;

        // Add to streak count
        this.total_streaks += 1;
        this.limit_streak();

        // Every 3 streaks increase the number of 
        // drops in order (required streak) by 1
        if(this.total_streaks % 2 == 0){
            this.required_streak += 1;
        }

        // Streak reached
        this.streak_reached = true;

        // Tell drop generator to drop the power drop
        this.drop_generator.enable_power_drop(false);

    }

    clear_streak(){

        // Remove streak
        this.streak_reached = false;

        // Reset special streak
        this.special_streak_enabled = true;
        
        // Small explosion for all containers
        for(var i = 0; i < this.current_streak.length; i++){

            // Explode
            var small_explosion = new ParticleEmitter(this.container_vectors[i], 8, this.Color_Black, true, 20, 500, 
                new Phaser.Point(0,0), 1, 0, 500, this.game, this.game_controller);
            
            small_explosion.explode();

        }

        // Clear streak
        this.current_streak = [];

        // Redraw streak
        this.draw_streak();

    }

}

// -----------------------------------------------------------------------------
// Level Controller gameobject
//------------------------------
// This gameobject keeps track of current level and 
// makes each level different and more difficult
// -----------------------------------------------------------------------------
class LevelController extends GameObject{

    constructor(starting_level, level_label_ref, constant_level_ref, goal_controller, game, game_controller){

        super(game, game_controller);
        
        // Linking
        this.goal_controller = goal_controller;

        // Starting level
        this.level = starting_level;
        this.starting_level = starting_level;

        // Label reference
        this.level_label = level_label_ref;
        this.constant_level = constant_level_ref;

        // Create score watcher
        this.score_watcher = game.time.create(false);
        this.score_watcher.add(1000, this.check_score, this);
        this.score_watcher.start();

        // Fade out level
        this.fade_level_in();

        // Keep track of blocker drops
        this.blocker_drops = [];

        // Holds the points where blockers are placed
        // so that they can be referenced in order to
        // properly space out the blockers
        this.min_distance_between_blockers = this.goal_controller.get_screen_width() * 0.255;
        this.blocker_vectors = [];

    }

    get_level(){
        return this.level;
    }

    check_score(){

        var score = this.game_controller.get_score();
        var old_level = this.level;

        // Increase level every 10000 points
        this.level = this.starting_level + Math.floor(score/10000);
        if(this.level < 1) this.level = 1;

        if(old_level != this.level){
            this.reached_new_level();
        }

        this.score_watcher.add(1000, this.check_score, this);

        // Add blocker drops if they were skipped by too much of
        // an increase in points
        var how_many_blockers_should_be_present = Math.floor(this.level/2);
        
        // Limit blockers to 5
        if(how_many_blockers_should_be_present>5) how_many_blockers_should_be_present = 5;
        
        // Make sure to keep the correct number of blockers
        // up until level 10, then you have the ability to 
        // remove them with power drops
        if(this.level < 11){

            for(var i = 0; i < how_many_blockers_should_be_present - this.blocker_drops.length; i++){
            
                this.create_a_blocker();
    
            }
            
        }

    }

    fade_level_in(){

        // Fade level text in
        this.level_label.setText("Level " + this.level.toString());
        if(this.level == 20) this.level_label.setText("Point of No Return");
        this.constant_level.setText(this.level.toString());
        this.game.add.tween(this.level_label).to( { alpha: 1 }, 1000, "Linear", true);

        this.fade_out_timer = this.game.time.create(false);
        this.fade_out_timer.add(2500, this.fade_level_out, this);
        this.fade_out_timer.start();

    }

    fade_level_out(){

        // Fade level text out
        this.game.add.tween(this.level_label).to( { alpha: 0 }, 1000, "Linear", true);
    }

    reached_new_level(){

        // Add some time between drops in order to navigate new blocker
        // Need this or the game never gets harder
        this.game_controller.reduce_drop_generator_drop_time(40);

        // Show new level
        this.fade_level_in();

        this.create_a_blocker();

    }

    create_a_blocker(){

        // Only have 5 blockers at a time
        if(this.blocker_drops.length>4) return;

        // Create a blocker
        var total_width = this.goal_controller.get_screen_width() - (2 * (this.goal_controller.get_side_padding()));
        
        var min_y = this.goal_controller.get_screen_height() * 0.15;
        var max_y = this.goal_controller.get_screen_height() - (this.goal_controller.get_screen_height() * 0.15);
        
        var can_create = false;

        // Try only 100 times to create blocker (keep from infinite looping)
        var fail_count = 0;
        while(!can_create && fail_count < 100){

            var x_pos = this.game.rnd.integerInRange(this.goal_controller.get_side_padding() + (total_width * 0.15), 
                    (this.goal_controller.get_screen_width() - this.goal_controller.get_side_padding()) - (total_width * 0.15)); 
        
            var y_pos = this.game.rnd.integerInRange(min_y, max_y);

            // See if these new x,y values are a good point
            // (not too close to another blocker)
            can_create = true;

            // Loop through all old vectors and check distance
            for(var i = 0; i < this.blocker_vectors.length; i++){

                var distance = this.blocker_vectors[i].distance(new Phaser.Point(x_pos, y_pos));
                if(distance < this.min_distance_between_blockers){
                    can_create = false;
                    break;
                }

            }

            // Cannot be too close to center of the screen
            var center_pos = new Phaser.Point(this.game.world.centerX, this.game.world.centerY);
            if(center_pos.distance(new Phaser.Point(x_pos, y_pos) < this.min_distance_between_blockers)){
                can_create = false;
            }

            fail_count++;

        }
        
        var blocker_vector = new Phaser.Point(x_pos, y_pos);
        var blocker_drop = new Drop(true, this.game_controller.get_drop_generator(), blocker_vector, 50, this.Color_Black, null, this.game, this.game_controller);
        this.blocker_drops.push(blocker_drop);
        this.blocker_vectors.push(blocker_vector);

    }

    remove_a_blocker(){

        // If there's any blockers then remove one
        if(this.blocker_drops.length>0){
            this.blocker_drops[0].remove_blocker();
            this.blocker_drops.splice(0,1);
        }

    }

    remove_all_blockers(){
        
        for(var i = 0; i < this.blocker_drops.length; i++){
            this.remove_a_blocker();
        }
    }

}

// Start game
var color_drop = new ColorDrop(1000, 1500);

// Game ID
// b7b778db163743bbbe7107b119c95f83

