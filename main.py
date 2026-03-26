maqueenPlusV2.i2c_init()

THRESHOLD = 200

vals=[-140, -90, 0, 90, 140]

def on_forever():
    val=0
    for x in range(5):
        dist = matrixLidarDistance.matrix_point_output(matrixLidarDistance.Addr.ADDR4, x, 2)
        
        if  dist <= THRESHOLD:
            
            if dist > THRESHOLD:
                dist = THRESHOLD

            #led.plot(x, 2)
            val += vals[x] * (dist / THRESHOLD)


    leftSpeed=145
    rightSpeed=145


    if val >= 5:
        rightSpeed -= val
        
    if val <= 5:
        leftSpeed += val
    
    if leftSpeed < 0:
        maqueenPlusV2.control_motor(maqueenPlusV2.MyEnumMotor.LEFT_MOTOR, maqueenPlusV2.MyEnumDir.BACKWARD, -leftSpeed)
    else:
        maqueenPlusV2.control_motor(maqueenPlusV2.MyEnumMotor.LEFT_MOTOR, maqueenPlusV2.MyEnumDir.FORWARD, leftSpeed)

    if rightSpeed < 0:
        maqueenPlusV2.control_motor(maqueenPlusV2.MyEnumMotor.RIGHT_MOTOR, maqueenPlusV2.MyEnumDir.BACKWARD, -rightSpeed)
    else:
        maqueenPlusV2.control_motor(maqueenPlusV2.MyEnumMotor.RIGHT_MOTOR, maqueenPlusV2.MyEnumDir.FORWARD, rightSpeed)


    
basic.forever(on_forever)