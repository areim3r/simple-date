//  init some vars
var month, day, year, newDate;
var months = ['\(ø_ø)/','January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDate(date, format){  //////////////////////  format dates
    
    var fullDate = new Date(date),
        dateMonth = fullDate.getMonth()+1,
        dateDay = fullDate.getDate(),
        dateYear = fullDate.getFullYear();
    
    if(dateDay < 10){
        dateDay = '0'+dateDay;   
    }
    
    if(format == 'slashed' || format == 'dashed'){  //  does not sync w/ months array (doesn't need to, numeric date format)
        if(dateMonth < 10){
            dateMonth = '0'+dateMonth;   
        }
    }
    
    switch(format){
        case 'slashed':
            var newDate = dateMonth+'/'+dateDay+'/'+dateYear;
            return newDate;
            break;
        case 'dashed':
            var newDate = dateMonth+'-'+dateDay+'-'+dateYear;
            return newDate;
            break;
        case 'mdy':
            var month = months[dateMonth];
            var newDate = month+' '+dateDay+', '+dateYear;
            return newDate;
            break;
        case 'dmy':
            var month = months[dateMonth];
            var newDate = dateDay+' '+month+', '+dateYear;
            return newDate;
            break;
        default:
            return console.error('error formatting date');
    }
                
}

function simpleDate (date, format) {   ////////////////    return formatted dates
    
    var dash = dashRegex.test(date),
        slash = slashRegex.test(date),
        mdy = mdyRegex.test(date),
        dmy = dmyRegex.test(date);
    
    switch(format){
        case 'dashed':
            
            if(dash){
                return errHandler('', sameErr);
                
            }else if(slash){
                newDate = date.replace(/\//g, '-');
                return newDate;
            }else if(mdy || dmy){
                newDate = formatDate(date, 'dashed');
                return newDate;
            }else{
                return errHandler(date, dateFormatErr); 
            }
            break;
            
        case 'slashed':
            
            if(slash){
                return errHandler('', sameErr);
            }else if(dash){
                newDate = date.replace(/-/g, '/');
                return newDate;
            }else if(mdy || dmy){
                newDate = formatDate(date, 'slashed');
                return newDate;
            }else{
                return errHandler(date, dateFormatErr);    
            }
            break;
            
        case 'mdy':
            
            if(dash || slash){
                newDate = formatDate(date, 'mdy');
                return newDate;
            }else if(dmy){
                newDate = formatDate(date, 'mdy');
                return newDate;
            }else if(mdy){
                return errHandler('', sameErr);
            }else{
                return errHandler(date, dateFormatErr);
            }
            break;
            
        case 'dmy':
            
            if(dash || slash){
                newDate = formatDate(date, 'dmy');
                return newDate;
            }else if(mdy){
                newDate = formatDate(date, 'dmy');
                return newDate;
            }else if(dmy){
                return errHandler('', sameErr);
            }else{
                return errHandler(date, dateFormatErr);
            }
            break;
            
        default:
            return errHandler(format, formatArgErr);
    }
}

function errHandler(input, err){
    if(err == sameErr){
        console.error('Self-Reference Error: '+ sameErr);
    }
    if(err == formatArgErr){
        console.error('Format Error: "'+ input + '", is not a supported format argument!');
        console.error(err);
    }
    if(err == dateFormatErr){
        console.error('Format Error: "'+ input +'", is not a supported date input format!');
        console.error(err);
    }
}

// error messages
var dateFormatErr = 'try [[ XX-XX-XXXX ]], [[ XX/XX/XXXX ]], [[ January 01, 2015 ]], or [[ 01 January, 2015 ]]';
var formatArgErr = 'Bad format argument! Try: slashed, dashed, mdy, & dmy';
var sameErr = 'please specify an alternate date format!';

//  4 formats (top to bottom): dash, slash, month-day-year, and day-month-year
var dashRegex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}/,
    slashRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,
    mdyRegex = /^[A-z]+\s+[0-9]{2},+\s+[0-9]{4}/,
    dmyRegex = /^[0-9]{2}\s[A-z]+,\s[0-9]{4}/;

module.exports = { format: simpleDate }