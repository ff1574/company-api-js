var _0x3bb40b=_0x3d55;(function(_0x13230b,_0x29f349){var _0x1b3463=_0x3d55,_0x5a4ef7=_0x13230b();while(!![]){try{var _0x295031=parseInt(_0x1b3463(0x152))/0x1+-parseInt(_0x1b3463(0x142))/0x2*(-parseInt(_0x1b3463(0x14e))/0x3)+-parseInt(_0x1b3463(0x156))/0x4*(-parseInt(_0x1b3463(0x148))/0x5)+-parseInt(_0x1b3463(0x146))/0x6+-parseInt(_0x1b3463(0x153))/0x7+-parseInt(_0x1b3463(0x159))/0x8+parseInt(_0x1b3463(0x149))/0x9*(-parseInt(_0x1b3463(0x155))/0xa);if(_0x295031===_0x29f349)break;else _0x5a4ef7['push'](_0x5a4ef7['shift']());}catch(_0x8cfcab){_0x5a4ef7['push'](_0x5a4ef7['shift']());}}}(_0x38c0,0x36841));const format=require(_0x3bb40b(0x14d));function _0x3d55(_0x3e59b9,_0x45d903){var _0x38c0d3=_0x38c0();return _0x3d55=function(_0x3d55de,_0x98956c){_0x3d55de=_0x3d55de-0x13e;var _0x4e55e0=_0x38c0d3[_0x3d55de];return _0x4e55e0;},_0x3d55(_0x3e59b9,_0x45d903);}function isValidDate(_0x3347d7){var _0x257220=_0x3bb40b,_0x24aff4=/^\d{4}-\d{2}-\d{2}$/;if(!_0x3347d7[_0x257220(0x158)](_0x24aff4))return![];var _0x3c2b82=new Date(_0x3347d7);if(!_0x3c2b82[_0x257220(0x144)]()&&_0x3c2b82['getTime']()!==0x0)return![];return _0x3c2b82['toISOString']()['slice'](0x0,0xa)===_0x3347d7;}function _0x38c0(){var _0x1d124d=['getEndTime','getId','split','4ukgUSO','getStartTime','getTime','emp_id','473388wXAczI','start_time','61905rMhUEY','211905LfbCnZ','setStartTime','prototype','setId','date-fns/format','270948mHCoeq','timecard_id','yyyy-MM-dd\x20HH:mm:ss','end_time','100264jMhvSd','383264iApFUk','getEmpId','20etbJZe','60aGAsXF','exports','match','500592NuvHGT','test','([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])'];_0x38c0=function(){return _0x1d124d;};return _0x38c0();}function validateTime(_0x33ca76){var _0x12d6a0=_0x3bb40b,_0x500860=new RegExp(_0x12d6a0(0x13e));return _0x500860[_0x12d6a0(0x15a)](_0x33ca76)?!![]:![];}var Timecard=function(_0x29d889=format(new Date(),'yyyy-MM-dd\x20HH:mm:ss'),_0x5af90f=format(new Date(),_0x3bb40b(0x150)),_0x8d8925=0x0,_0xe00cde=null){var _0x11a239=_0x3bb40b;if(!(this instanceof Timecard))throw new Error('Timecard\x20needs\x20to\x20be\x20called\x20with\x20the\x20new\x20keyword');this[_0x11a239(0x145)]=_0x8d8925,this['timecard_id']=_0xe00cde;var _0x133141=_0x29d889[_0x11a239(0x141)]('\x20');isValidDate(_0x133141[0x0])&&validateTime(_0x133141[0x1])?this['start_time']=_0x29d889:this[_0x11a239(0x147)]=format(new Date(),_0x11a239(0x150));var _0x4bd1ef=_0x5af90f[_0x11a239(0x141)]('\x20');isValidDate(_0x4bd1ef[0x0])&&validateTime(_0x4bd1ef[0x1])?this['end_time']=_0x5af90f:this[_0x11a239(0x151)]=format(new Date(),_0x11a239(0x150));};Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x140)]=function(){var _0x5463ee=_0x3bb40b;return this[_0x5463ee(0x14f)];},Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x143)]=function(){var _0x3c94d9=_0x3bb40b;return this[_0x3c94d9(0x147)];},Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x13f)]=function(){var _0x1c7bda=_0x3bb40b;return this[_0x1c7bda(0x151)];},Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x154)]=function(){var _0x30cd5d=_0x3bb40b;return this[_0x30cd5d(0x145)];},Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x14c)]=function(_0x464e81){var _0x5590d4=_0x3bb40b;this[_0x5590d4(0x14f)]=_0x464e81;},Timecard[_0x3bb40b(0x14b)][_0x3bb40b(0x14a)]=function(_0x68e7af){var _0x452094=_0x3bb40b,_0xeaaa2=_0x68e7af[_0x452094(0x141)]('\x20');isValidDate(_0xeaaa2[0x0])&&validateTime(_0xeaaa2[0x1])?this[_0x452094(0x147)]=_0x68e7af:this[_0x452094(0x147)]=format(new Date(),_0x452094(0x150));},Timecard['prototype']['setEndTime']=function(_0x20eb81){var _0x4abb2=_0x3bb40b,_0x102379=_0x20eb81[_0x4abb2(0x141)]('\x20');isValidDate(_0x102379[0x0])&&validateTime(_0x102379[0x1])?this[_0x4abb2(0x151)]=_0x20eb81:this[_0x4abb2(0x151)]=format(new Date(),_0x4abb2(0x150));},Timecard['prototype']['setEmpId']=function(_0x46cd3d){var _0x21feeb=_0x3bb40b;this[_0x21feeb(0x145)]=_0x46cd3d;},module[_0x3bb40b(0x157)]=Timecard;