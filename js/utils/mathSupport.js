/*


dx/dt = A-Bx
dx/(A-Bx) = dt
-ln(A-Bx)/B = t+c

so c = -ln(A-B[CURRENT])/B



*/
function getLogisticTimeConstant(current, gain, loss){
        if (current.eq(gain.div(loss))) return Infinity
        return current.times(loss).sub(gain).times(-1).ln().div(-1).div(loss)
}

function logisticTimeUntil(goal, current, gain, loss){
        if (current.gte(goal)) return formatTime(0)
        if (goal.gte(gain.div(loss))) return formatTime(1/0)
        // we have current < goal < gain/loss
        val1 = goal.times(loss) //Bx
        val2 = gain.sub(val1) //A-Bx
        val3 = val2.ln() //ln(A-Bx)
        val4 = val3.times(-1).div(loss) //LHS

        c = getLogisticTimeConstant(current, gain, loss)
        return val4.sub(c)        
}


function getLogisticAmount(current, gain, loss, diff){
        if (current.eq(gain.div(loss))) return current
        c = getLogisticTimeConstant(current, gain, loss)
        
        val1 = c.plus(diff) // t+c
        val2 = val1.times(-1).times(loss) // -B(t+c)
        val3 = Decimal.exp(val2) // this should be A-Bx
        val4 = gain.sub(val3) // should be A-(A-Bx) = Bx
        val5 = val4.div(loss) // should be x

        return val5
}









