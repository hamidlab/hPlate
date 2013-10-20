function hplate(text, data){
    if(typeof data !== "object" || !text) return false;

    this.text = text;
    this.data = data;
    this.blockData = {};

    this.regs = {
        hVars: new RegExp('%\\{[\\w\\.]+\\}', 'g'),
        blockStart: function(s){
            if(!s) return false;
            return new RegExp('%\\['+s+' %\\{[\\w.]+\\}\\]', 'g');
        },
        blockEnd: new RegExp('%\\[end\\]', 'g'),
        hBlock: function(s){
            if(!s) return false;
            return new RegExp('%\\['+s+' %\\{[\\w.]+\\}\\](\\s|\\S)+?(%\\[end\\])', 'g');
        }
    };

    this.getVarVal = function(varStr){
        if(!varStr) return false;
        varStr = varStr.replace(/^%\{/, '').replace(/\}$/, '');
        var vsa = varStr.split('.');
        var returnVal = this.data;
        for(var i in vsa){
            returnVal = returnVal[vsa[i]];
        }
        return returnVal;
    }

    this.removeDuplicates = function(ar){
        return ar.filter(function(elem, pos) {
            return ar.indexOf(elem) == pos;
        });
    }

    this.cleanBlockCond = function(blck, bText){
        bText = bText.replace(new RegExp('^(%\\['+blck+' )'), '').replace(new RegExp('\\]$'), '');
        return bText;
    }

    this.getBlockText = function(blck, text){
        var _this = this;
        var bCond = text.match(_this.regs.blockStart(blck))[0];
        text = text.replace(_this.regs.blockStart(blck), '').replace(_this.regs.blockEnd, '');

        switch(blck){
            case 'if':
                ifCond = _this.cleanBlockCond(blck, bCond);
                ifCond = _this.getVarVal(ifCond);
                if(!ifCond){
                    text = '';
                }
                break;
        }

        return text;
    }


    this.replaceVars = function(text){
        var _this = this;
        var regEx = _this.regs.hVars;
        var result = _this.removeDuplicates(text.match(_this.regs.hVars));
        var parsedStr = text;
        for(var i in result){
            parsedStr = parsedStr.replace(new RegExp(result[i], 'g'), _this.getVarVal(result[i]));
        }
        return parsedStr;
    }

    this.parseBlocks = function(s, text){
        var _this = this;
        if(!s) return text;
        var blocks = text.match(_this.regs.hBlock(s));

        for(var i in blocks){
            text = text.replace(blocks[i], _this.getBlockText(s, blocks[i]));
        }

        return text;
    }

    this.getText = function(){
        var _this = this;
        var text = _this.text;

        text = _this.parseBlocks('if', text);

        text = _this.replaceVars(text);
        return text;
    };
}









