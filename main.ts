maqueenPlusV2.I2CInit()
let THRESHOLD = 200
let vals = [-140, -90, 0, 90, 140]
basic.forever(function on_forever() {
    let dist: number;
    let val = 0
    for (let x = 0; x < 5; x++) {
        dist = matrixLidarDistance.matrixPointOutput(matrixLidarDistance.Addr.Addr4, x, 2)
        if (dist <= THRESHOLD) {
            if (dist > THRESHOLD) {
                dist = THRESHOLD
            }
            
            // led.plot(x, 2)
            val += vals[x] * (dist / THRESHOLD)
        }
        
    }
    let leftSpeed = 145
    let rightSpeed = 145
    if (val >= 5) {
        rightSpeed -= val
    }
    
    if (val <= 5) {
        leftSpeed += val
    }
    
    if (leftSpeed < 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, -leftSpeed)
    } else {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, leftSpeed)
    }
    
    if (rightSpeed < 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, -rightSpeed)
    } else {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, rightSpeed)
    }
    
})
