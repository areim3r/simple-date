//  init some vars
var month, day, year, newDate;
var months = ['\(ø_ø)/','January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDate(date, format, isObj){  //////////////////////  format dates
    
    if(isObj){
        var dateMonth = date.getMonth()+1,
        dateDay = date.getDate(),
        dateYear = date.getFullYear();  
    }else{
        var inputDate = new Date(date),
            dateMonth = inputDate.getMonth()+1,
            dateDay = inputDate.getDate(),
            dateYear = inputDate.getFullYear();
    }
    
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
            return errHandler(format, formatArgErr);
    }
                
}

function simpleDate (date, format) {   ////////////////    return formatted dates
    
    var dash = dashRegex.test(date),
        slash = slashRegex.test(date),
        mdy = mdyRegex.test(date),
        dmy = dmyRegex.test(date);
    
    if((date instanceof Date)){
        
        try{
            newDate = formatDate(date, format, true);
            return newDate;
        }catch(err){
            return errHandler(format, formatArgErr);
        }
        
    }
    
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
    
    if(err == formatArgErr){
        console.error(formatArgErr.err(input));
        console.info(formatArgErr.help);
        return;
    }else if(err == dateFormatErr){
        console.error(dateFormatErr.err(input));
        console.info(dateFormatErr.help);
        return;
    }else if(err == sameErr){
        console.error(sameErr.err);
        console.info(sameErr.help);
        return;
    }
    
}

var dateFormatErr = { err: function(input){return 'ERROR: 1st-Argument __'+input+'__ is not a date'} , help: 'HELP: try [[ XX-XX-XXXX ]], [[ XX/XX/XXXX ]], [[ January 01, 2015 ]], or [[ 01 January, 2015 ]]'}

var formatArgErr = { err: function(input){return 'ERROR: 2nd-Argument __'+input+'__ is an illegal format'} , help: 'HELP: try slashed, dashed, mdy, & dmy'}

var sameErr = { err: 'ERROR: 1st/2nd-Arguments are the same format' , help: 'HELP: change the output format, it should not match the format of the date passed' }

//  4 formats (top to bottom): dash, slash, month-day-year, and day-month-year
var dashRegex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}/,
    slashRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,
    mdyRegex = /^[A-z]+\s+[0-9]{2},+\s+[0-9]{4}/,
    dmyRegex = /^[0-9]{2}\s[A-z]+,\s[0-9]{4}/;

module.exports = { format: simpleDate }