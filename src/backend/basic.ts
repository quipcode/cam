import React, { useEffect, useCallback, useState } from 'react'

const BasicBackend = () => {
let now = new Date()
let thisYear = now.getFullYear()
let thisMonth = now.getMonth()
let thisDay = now.getDate()
let thisDayStart = new Date(thisYear, thisMonth, thisDay)
let thisDayEnd = new Date(thisDayStart.getTime() + 86399999)

}

export default BasicBackend