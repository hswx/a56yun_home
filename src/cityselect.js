/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },
    /*js触发js的onchange方法和juery绑定的change事件*/
    triggerEvent:function(eventElement){
        if (document.createEvent) {
            var evObj = document.createEvent('HTMLEvents');
            evObj.initEvent('change', true, false);
            eventElement.dispatchEvent(evObj);
        }
        else if (document.createEventObject) {
            eventElement.fireEvent('onchange');
        }
    },
    /* 在元素中追加内容 */
    insertAfter:function( newElement, targetElement ){ // newElement是要追加的元素 targetElement 是指定元素的位置
            var parent = targetElement.parentNode; // 找到指定元素的父节点
            if (parent.lastChild == targetElement) { // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
                parent.appendChild(newElement, targetElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
            }
    },
    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    remove:function(node,type,handler){
        node.removeEventListener ? node.removeEventListener(type,handler,false): node.detachEvent('on'+type,handler);
    },
    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */


Vcity.allCity=['黄浦区,上海市,上海市|huangpuqu,shanghaishi,shanghaishi|hpq,shs,shs',
    '卢湾区,上海市,上海市|luwanqu,shanghaishi,shanghaishi|lwq,shs,shs',
    '徐汇区,上海市,上海市|xuhuiqu,shanghaishi,shanghaishi|xhq,shs,shs',
    '长宁区,上海市,上海市|zhangningqu,shanghaishi,shanghaishi|znq,shs,shs',
    '静安区,上海市,上海市|jinganqu,shanghaishi,shanghaishi|jaq,shs,shs',
    '普陀区,上海市,上海市|putuoqu,shanghaishi,shanghaishi|ptq,shs,shs',
    '闸北区,上海市,上海市|zhabeiqu,shanghaishi,shanghaishi|zbq,shs,shs',
    '虹口区,上海市,上海市|hongkouqu,shanghaishi,shanghaishi|hkq,shs,shs',
    '杨浦区,上海市,上海市|yangpuqu,shanghaishi,shanghaishi|ypq,shs,shs',
    '闵行区,上海市,上海市|minxingqu,shanghaishi,shanghaishi|mxq,shs,shs',
    '宝山区,上海市,上海市|baoshanqu,shanghaishi,shanghaishi|bsq,shs,shs',
    '嘉定区,上海市,上海市|jiadingqu,shanghaishi,shanghaishi|jdq,shs,shs',
    '浦东新区,上海市,上海市|pudongxinqu,shanghaishi,shanghaishi|pdxq,shs,shs',
    '金山区,上海市,上海市|jinshanqu,shanghaishi,shanghaishi|jsq,shs,shs',
    '松江区,上海市,上海市|songjiangqu,shanghaishi,shanghaishi|sjq,shs,shs',
    '青浦区,上海市,上海市|qingpuqu,shanghaishi,shanghaishi|qpq,shs,shs',
    '奉贤区,上海市,上海市|fengxianqu,shanghaishi,shanghaishi|fxq,shs,shs',
    '崇明县,上海市,上海市|chongmingxian,shanghaishi,shanghaishi|cmx,shs,shs',
    '南京市,南京市,江苏省|nanjingshi,nanjingshi,jiangsusheng|njs,njs,jss',
    '鼓楼区,南京市,江苏省|gulouqu,nanjingshi,jiangsusheng|glq,njs,jss',
    '玄武区,南京市,江苏省|xuanwuqu,nanjingshi,jiangsusheng|xwq,njs,jss',
    '白下区,南京市,江苏省|baixiaqu,nanjingshi,jiangsusheng|bxq,njs,jss',
    '秦淮区,南京市,江苏省|qinhuaiqu,nanjingshi,jiangsusheng|qhq,njs,jss',
    '建邺区,南京市,江苏省|jianyequ,nanjingshi,jiangsusheng|jyq,njs,jss',
    '下关区,南京市,江苏省|xiaguanqu,nanjingshi,jiangsusheng|xgq,njs,jss',
    '浦口区,南京市,江苏省|pukouqu,nanjingshi,jiangsusheng|pkq,njs,jss',
    '栖霞区,南京市,江苏省|qixiaqu,nanjingshi,jiangsusheng|qxq,njs,jss',
    '雨花台区,南京市,江苏省|yuhuataiqu,nanjingshi,jiangsusheng|yhtq,njs,jss',
    '江宁区,南京市,江苏省|jiangningqu,nanjingshi,jiangsusheng|jnq,njs,jss',
    '六合区,南京市,江苏省|liuhequ,nanjingshi,jiangsusheng|lhq,njs,jss',
    '溧水县,南京市,江苏省|lishuixian,nanjingshi,jiangsusheng|lsx,njs,jss',
    '高淳县,南京市,江苏省|gaochunxian,nanjingshi,jiangsusheng|gcx,njs,jss',
    '无锡市,无锡市,江苏省|wuxishi,wuxishi,jiangsusheng|wxs,wxs,jss',
    '崇安区,无锡市,江苏省|chonganqu,wuxishi,jiangsusheng|caq,wxs,jss',
    '南长区,无锡市,江苏省|nanzhangqu,wuxishi,jiangsusheng|nzq,wxs,jss',
    '北塘区,无锡市,江苏省|beitangqu,wuxishi,jiangsusheng|btq,wxs,jss',
    '锡山区,无锡市,江苏省|xishanqu,wuxishi,jiangsusheng|xsq,wxs,jss',
    '惠山区,无锡市,江苏省|huishanqu,wuxishi,jiangsusheng|hsq,wxs,jss',
    '滨湖区,无锡市,江苏省|binhuqu,wuxishi,jiangsusheng|bhq,wxs,jss',
    '江阴市,无锡市,江苏省|jiangyinshi,wuxishi,jiangsusheng|jys,wxs,jss',
    '宜兴市,无锡市,江苏省|yixingshi,wuxishi,jiangsusheng|yxs,wxs,jss',
    '徐州市,徐州市,江苏省|xuzhoushi,xuzhoushi,jiangsusheng|xzs,xzs,jss',
    '鼓楼区,徐州市,江苏省|gulouqu,xuzhoushi,jiangsusheng|glq,xzs,jss',
    '云龙区,徐州市,江苏省|yunlongqu,xuzhoushi,jiangsusheng|ylq,xzs,jss',
    '九里区,徐州市,江苏省|jiuliqu,xuzhoushi,jiangsusheng|jlq,xzs,jss',
    '贾汪区,徐州市,江苏省|jiawangqu,xuzhoushi,jiangsusheng|jwq,xzs,jss',
    '泉山区,徐州市,江苏省|quanshanqu,xuzhoushi,jiangsusheng|qsq,xzs,jss',
    '丰县,徐州市,江苏省|fengxian,xuzhoushi,jiangsusheng|fx,xzs,jss',
    '沛县,徐州市,江苏省|peixian,xuzhoushi,jiangsusheng|px,xzs,jss',
    '铜山县,徐州市,江苏省|tongshanxian,xuzhoushi,jiangsusheng|tsx,xzs,jss',
    '睢宁县,徐州市,江苏省|suiningxian,xuzhoushi,jiangsusheng|snx,xzs,jss',
    '新沂市,徐州市,江苏省|xinyishi,xuzhoushi,jiangsusheng|xys,xzs,jss',
    '邳州市,徐州市,江苏省|pizhoushi,xuzhoushi,jiangsusheng|pzs,xzs,jss',
    '常州市,常州市,江苏省|changzhoushi,changzhoushi,jiangsusheng|czs,czs,jss',
    '天宁区,常州市,江苏省|tianningqu,changzhoushi,jiangsusheng|tnq,czs,jss',
    '钟楼区,常州市,江苏省|zhonglouqu,changzhoushi,jiangsusheng|zlq,czs,jss',
    '戚墅堰区,常州市,江苏省|qishuyanqu,changzhoushi,jiangsusheng|qsyq,czs,jss',
    '新北区,常州市,江苏省|xinbeiqu,changzhoushi,jiangsusheng|xbq,czs,jss',
    '武进区,常州市,江苏省|wujinqu,changzhoushi,jiangsusheng|wjq,czs,jss',
    '溧阳市,常州市,江苏省|liyangshi,changzhoushi,jiangsusheng|lys,czs,jss',
    '金坛区,常州市,江苏省|jintanqu,changzhoushi,jiangsusheng|jtq,czs,jss',
    '苏州市,苏州市,江苏省|suzhoushi,suzhoushi,jiangsusheng|szs,szs,jss',
    '沧浪区,苏州市,江苏省|canglangqu,suzhoushi,jiangsusheng|clq,szs,jss',
    '平江区,苏州市,江苏省|pingjiangqu,suzhoushi,jiangsusheng|pjq,szs,jss',
    '金阊区,苏州市,江苏省|jinchangqu,suzhoushi,jiangsusheng|jcq,szs,jss',
    '虎丘区,苏州市,江苏省|huqiuqu,suzhoushi,jiangsusheng|hqq,szs,jss',
    '吴中区,苏州市,江苏省|wuzhongqu,suzhoushi,jiangsusheng|wzq,szs,jss',
    '相城区,苏州市,江苏省|xiangchengqu,suzhoushi,jiangsusheng|xcq,szs,jss',
    '苏州新区,苏州市,江苏省|suzhouxinqu,suzhoushi,jiangsusheng|szxq,szs,jss',
    '苏州工业园区,苏州市,江苏省|suzhougongyeyuanqu,suzhoushi,jiangsusheng|szgyyq,szs,jss',
    '常熟市,苏州市,江苏省|changshushi,suzhoushi,jiangsusheng|css,szs,jss',
    '张家港市,苏州市,江苏省|zhangjiagangshi,suzhoushi,jiangsusheng|zjgs,szs,jss',
    '昆山市,苏州市,江苏省|kunshanshi,suzhoushi,jiangsusheng|kss,szs,jss',
    '吴江区,苏州市,江苏省|wujiangqu,suzhoushi,jiangsusheng|wjq,szs,jss',
    '太仓市,苏州市,江苏省|taicangshi,suzhoushi,jiangsusheng|tcs,szs,jss',
    '姑苏区,苏州市,江苏省|gusuqu,suzhoushi,jiangsusheng|gsq,szs,jss',
    '南通市,南通市,江苏省|nantongshi,nantongshi,jiangsusheng|nts,nts,jss',
    '崇川区,南通市,江苏省|chongchuanqu,nantongshi,jiangsusheng|ccq,nts,jss',
    '港闸区,南通市,江苏省|gangzhaqu,nantongshi,jiangsusheng|gzq,nts,jss',
    '海安县,南通市,江苏省|haianxian,nantongshi,jiangsusheng|hax,nts,jss',
    '如东县,南通市,江苏省|rudongxian,nantongshi,jiangsusheng|rdx,nts,jss',
    '启东市,南通市,江苏省|qidongshi,nantongshi,jiangsusheng|qds,nts,jss',
    '如皋市,南通市,江苏省|rugaoshi,nantongshi,jiangsusheng|rgs,nts,jss',
    '通州区,南通市,江苏省|tongzhouqu,nantongshi,jiangsusheng|tzq,nts,jss',
    '海门市,南通市,江苏省|haimenshi,nantongshi,jiangsusheng|hms,nts,jss',
    '连云港市,连云港市,江苏省|lianyungangshi,lianyungangshi,jiangsusheng|lygs,lygs,jss',
    '连云区,连云港市,江苏省|lianyunqu,lianyungangshi,jiangsusheng|lyq,lygs,jss',
    '新浦区,连云港市,江苏省|xinpuqu,lianyungangshi,jiangsusheng|xpq,lygs,jss',
    '海州区,连云港市,江苏省|haizhouqu,lianyungangshi,jiangsusheng|hzq,lygs,jss',
    '赣榆县,连云港市,江苏省|ganyuxian,lianyungangshi,jiangsusheng|gyx,lygs,jss',
    '东海县,连云港市,江苏省|donghaixian,lianyungangshi,jiangsusheng|dhx,lygs,jss',
    '灌云县,连云港市,江苏省|guanyunxian,lianyungangshi,jiangsusheng|gyx,lygs,jss',
    '灌南县,连云港市,江苏省|guannanxian,lianyungangshi,jiangsusheng|gnx,lygs,jss',
    '淮安市,淮安市,江苏省|huaianshi,huaianshi,jiangsusheng|has,has,jss',
    '清河区,淮安市,江苏省|qinghequ,huaianshi,jiangsusheng|qhq,has,jss',
    '淮安区,淮安市,江苏省|huaianqu,huaianshi,jiangsusheng|haq,has,jss',
    '楚州区,淮安市,江苏省|chuzhouqu,huaianshi,jiangsusheng|czq,has,jss',
    '淮阴区,淮安市,江苏省|huaiyinqu,huaianshi,jiangsusheng|hyq,has,jss',
    '清浦区,淮安市,江苏省|qingpuqu,huaianshi,jiangsusheng|qpq,has,jss',
    '涟水县,淮安市,江苏省|lianshuixian,huaianshi,jiangsusheng|lsx,has,jss',
    '洪泽县,淮安市,江苏省|hongzexian,huaianshi,jiangsusheng|hzx,has,jss',
    '盱眙县,淮安市,江苏省|xuyixian,huaianshi,jiangsusheng|xyx,has,jss',
    '金湖县,淮安市,江苏省|jinhuxian,huaianshi,jiangsusheng|jhx,has,jss',
    '盐城市,盐城市,江苏省|yanchengshi,yanchengshi,jiangsusheng|ycs,ycs,jss',
    '亭湖区,盐城市,江苏省|tinghuqu,yanchengshi,jiangsusheng|thq,ycs,jss',
    '盐都区,盐城市,江苏省|yandouqu,yanchengshi,jiangsusheng|ydq,ycs,jss',
    '响水县,盐城市,江苏省|xiangshuixian,yanchengshi,jiangsusheng|xsx,ycs,jss',
    '滨海县,盐城市,江苏省|binhaixian,yanchengshi,jiangsusheng|bhx,ycs,jss',
    '阜宁县,盐城市,江苏省|funingxian,yanchengshi,jiangsusheng|fnx,ycs,jss',
    '射阳县,盐城市,江苏省|sheyangxian,yanchengshi,jiangsusheng|syx,ycs,jss',
    '建湖县,盐城市,江苏省|jianhuxian,yanchengshi,jiangsusheng|jhx,ycs,jss',
    '东台市,盐城市,江苏省|dongtaishi,yanchengshi,jiangsusheng|dts,ycs,jss',
    '大丰区,盐城市,江苏省|dafengqu,yanchengshi,jiangsusheng|dfq,ycs,jss',
    '扬州市,扬州市,江苏省|yangzhoushi,yangzhoushi,jiangsusheng|yzs,yzs,jss',
    '广陵区,扬州市,江苏省|guanglingqu,yangzhoushi,jiangsusheng|glq,yzs,jss',
    '邗江区,扬州市,江苏省|hanjiangqu,yangzhoushi,jiangsusheng|hjq,yzs,jss',
    '维扬区,扬州市,江苏省|weiyangqu,yangzhoushi,jiangsusheng|wyq,yzs,jss',
    '宝应县,扬州市,江苏省|baoyingxian,yangzhoushi,jiangsusheng|byx,yzs,jss',
    '仪征市,扬州市,江苏省|yizhengshi,yangzhoushi,jiangsusheng|yzs,yzs,jss',
    '高邮市,扬州市,江苏省|gaoyoushi,yangzhoushi,jiangsusheng|gys,yzs,jss',
    '江都市,扬州市,江苏省|jiangdoushi,yangzhoushi,jiangsusheng|jds,yzs,jss',
    '镇江市,镇江市,江苏省|zhenjiangshi,zhenjiangshi,jiangsusheng|zjs,zjs,jss',
    '京口区,镇江市,江苏省|jingkouqu,zhenjiangshi,jiangsusheng|jkq,zjs,jss',
    '润州区,镇江市,江苏省|runzhouqu,zhenjiangshi,jiangsusheng|rzq,zjs,jss',
    '丹徒区,镇江市,江苏省|dantuqu,zhenjiangshi,jiangsusheng|dtq,zjs,jss',
    '丹阳市,镇江市,江苏省|danyangshi,zhenjiangshi,jiangsusheng|dys,zjs,jss',
    '扬中市,镇江市,江苏省|yangzhongshi,zhenjiangshi,jiangsusheng|yzs,zjs,jss',
    '句容市,镇江市,江苏省|jurongshi,zhenjiangshi,jiangsusheng|jrs,zjs,jss',
    '泰州市,泰州市,江苏省|taizhoushi,taizhoushi,jiangsusheng|tzs,tzs,jss',
    '海陵区,泰州市,江苏省|hailingqu,taizhoushi,jiangsusheng|hlq,tzs,jss',
    '高港区,泰州市,江苏省|gaogangqu,taizhoushi,jiangsusheng|ggq,tzs,jss',
    '兴化市,泰州市,江苏省|xinghuashi,taizhoushi,jiangsusheng|xhs,tzs,jss',
    '靖江市,泰州市,江苏省|jingjiangshi,taizhoushi,jiangsusheng|jjs,tzs,jss',
    '泰兴市,泰州市,江苏省|taixingshi,taizhoushi,jiangsusheng|txs,tzs,jss',
    '姜堰市,泰州市,江苏省|jiangyanshi,taizhoushi,jiangsusheng|jys,tzs,jss',
    '宿迁市,宿迁市,江苏省|suqianshi,suqianshi,jiangsusheng|sqs,sqs,jss',
    '宿城区,宿迁市,江苏省|suchengqu,suqianshi,jiangsusheng|scq,sqs,jss',
    '宿豫区,宿迁市,江苏省|suyuqu,suqianshi,jiangsusheng|syq,sqs,jss',
    '沭阳县,宿迁市,江苏省|shuyangxian,suqianshi,jiangsusheng|syx,sqs,jss',
    '泗阳县,宿迁市,江苏省|siyangxian,suqianshi,jiangsusheng|syx,sqs,jss',
    '泗洪县,宿迁市,江苏省|sihongxian,suqianshi,jiangsusheng|shx,sqs,jss',
    '上城区,杭州市,浙江省|shangchengqu,hangzhoushi,zhejiangsheng|scq,hzs,zjs',
    '下城区,杭州市,浙江省|xiachengqu,hangzhoushi,zhejiangsheng|xcq,hzs,zjs',
    '江干区,杭州市,浙江省|jiangganqu,hangzhoushi,zhejiangsheng|jgq,hzs,zjs',
    '拱墅区,杭州市,浙江省|gongshuqu,hangzhoushi,zhejiangsheng|gsq,hzs,zjs',
    '西湖区,杭州市,浙江省|xihuqu,hangzhoushi,zhejiangsheng|xhq,hzs,zjs',
    '滨江区,杭州市,浙江省|binjiangqu,hangzhoushi,zhejiangsheng|bjq,hzs,zjs',
    '萧山区,杭州市,浙江省|xiaoshanqu,hangzhoushi,zhejiangsheng|xsq,hzs,zjs',
    '余杭区,杭州市,浙江省|yuhangqu,hangzhoushi,zhejiangsheng|yhq,hzs,zjs',
    '桐庐县,杭州市,浙江省|tongluxian,hangzhoushi,zhejiangsheng|tlx,hzs,zjs',
    '淳安县,杭州市,浙江省|chunanxian,hangzhoushi,zhejiangsheng|cax,hzs,zjs',
    '建德市,杭州市,浙江省|jiandeshi,hangzhoushi,zhejiangsheng|jds,hzs,zjs',
    '富阳区,杭州市,浙江省|fuyangqu,hangzhoushi,zhejiangsheng|fyq,hzs,zjs',
    '临安市,杭州市,浙江省|linanshi,hangzhoushi,zhejiangsheng|las,hzs,zjs',
    '宁波市,宁波市,浙江省|ningboshi,ningboshi,zhejiangsheng|nbs,nbs,zjs',
    '海曙区,宁波市,浙江省|haishuqu,ningboshi,zhejiangsheng|hsq,nbs,zjs',
    '江东区,宁波市,浙江省|jiangdongqu,ningboshi,zhejiangsheng|jdq,nbs,zjs',
    '江北区,宁波市,浙江省|jiangbeiqu,ningboshi,zhejiangsheng|jbq,nbs,zjs',
    '北仑区,宁波市,浙江省|beilunqu,ningboshi,zhejiangsheng|blq,nbs,zjs',
    '镇海区,宁波市,浙江省|zhenhaiqu,ningboshi,zhejiangsheng|zhq,nbs,zjs',
    '鄞州区,宁波市,浙江省|yinzhouqu,ningboshi,zhejiangsheng|yzq,nbs,zjs',
    '象山县,宁波市,浙江省|xiangshanxian,ningboshi,zhejiangsheng|xsx,nbs,zjs',
    '宁海县,宁波市,浙江省|ninghaixian,ningboshi,zhejiangsheng|nhx,nbs,zjs',
    '余姚市,宁波市,浙江省|yuyaoshi,ningboshi,zhejiangsheng|yys,nbs,zjs',
    '慈溪市,宁波市,浙江省|cixishi,ningboshi,zhejiangsheng|cxs,nbs,zjs',
    '奉化市,宁波市,浙江省|fenghuashi,ningboshi,zhejiangsheng|fhs,nbs,zjs',
    '温州市,温州市,浙江省|wenzhoushi,wenzhoushi,zhejiangsheng|wzs,wzs,zjs',
    '鹿城区,温州市,浙江省|luchengqu,wenzhoushi,zhejiangsheng|lcq,wzs,zjs',
    '龙湾区,温州市,浙江省|longwanqu,wenzhoushi,zhejiangsheng|lwq,wzs,zjs',
    '瓯海区,温州市,浙江省|ouhaiqu,wenzhoushi,zhejiangsheng|ohq,wzs,zjs',
    '洞头区,温州市,浙江省|dongtouqu,wenzhoushi,zhejiangsheng|dtq,wzs,zjs',
    '永嘉县,温州市,浙江省|yongjiaxian,wenzhoushi,zhejiangsheng|yjx,wzs,zjs',
    '平阳县,温州市,浙江省|pingyangxian,wenzhoushi,zhejiangsheng|pyx,wzs,zjs',
    '苍南县,温州市,浙江省|cangnanxian,wenzhoushi,zhejiangsheng|cnx,wzs,zjs',
    '文成县,温州市,浙江省|wenchengxian,wenzhoushi,zhejiangsheng|wcx,wzs,zjs',
    '泰顺县,温州市,浙江省|taishunxian,wenzhoushi,zhejiangsheng|tsx,wzs,zjs',
    '瑞安市,温州市,浙江省|ruianshi,wenzhoushi,zhejiangsheng|ras,wzs,zjs',
    '乐清市,温州市,浙江省|leqingshi,wenzhoushi,zhejiangsheng|lqs,wzs,zjs',
    '嘉兴市,嘉兴市,浙江省|jiaxingshi,jiaxingshi,zhejiangsheng|jxs,jxs,zjs',
    '南湖区,嘉兴市,浙江省|nanhuqu,jiaxingshi,zhejiangsheng|nhq,jxs,zjs',
    '秀洲区,嘉兴市,浙江省|xiuzhouqu,jiaxingshi,zhejiangsheng|xzq,jxs,zjs',
    '嘉善县,嘉兴市,浙江省|jiashanxian,jiaxingshi,zhejiangsheng|jsx,jxs,zjs',
    '海盐县,嘉兴市,浙江省|haiyanxian,jiaxingshi,zhejiangsheng|hyx,jxs,zjs',
    '海宁市,嘉兴市,浙江省|hainingshi,jiaxingshi,zhejiangsheng|hns,jxs,zjs',
    '平湖市,嘉兴市,浙江省|pinghushi,jiaxingshi,zhejiangsheng|phs,jxs,zjs',
    '桐乡市,嘉兴市,浙江省|tongxiangshi,jiaxingshi,zhejiangsheng|txs,jxs,zjs',
    '湖州市,湖州市,浙江省|huzhoushi,huzhoushi,zhejiangsheng|hzs,hzs,zjs',
    '吴兴区,湖州市,浙江省|wuxingqu,huzhoushi,zhejiangsheng|wxq,hzs,zjs',
    '南浔区,湖州市,浙江省|nanxunqu,huzhoushi,zhejiangsheng|nxq,hzs,zjs',
    '德清县,湖州市,浙江省|deqingxian,huzhoushi,zhejiangsheng|dqx,hzs,zjs',
    '长兴县,湖州市,浙江省|zhangxingxian,huzhoushi,zhejiangsheng|zxx,hzs,zjs',
    '安吉县,湖州市,浙江省|anjixian,huzhoushi,zhejiangsheng|ajx,hzs,zjs',
    '绍兴市,绍兴市,浙江省|shaoxingshi,shaoxingshi,zhejiangsheng|sxs,sxs,zjs',
    '越城区,绍兴市,浙江省|yuechengqu,shaoxingshi,zhejiangsheng|ycq,sxs,zjs',
    '绍兴县,绍兴市,浙江省|shaoxingxian,shaoxingshi,zhejiangsheng|sxx,sxs,zjs',
    '柯桥区,绍兴市,浙江省|keqiaoqu,shaoxingshi,zhejiangsheng|kqq,sxs,zjs',
    '新昌县,绍兴市,浙江省|xinchangxian,shaoxingshi,zhejiangsheng|xcx,sxs,zjs',
    '诸暨市,绍兴市,浙江省|zhujishi,shaoxingshi,zhejiangsheng|zjs,sxs,zjs',
    '上虞市,绍兴市,浙江省|shangyushi,shaoxingshi,zhejiangsheng|sys,sxs,zjs',
    '嵊州市,绍兴市,浙江省|shengzhoushi,shaoxingshi,zhejiangsheng|szs,sxs,zjs',
    '金华市,金华市,浙江省|jinhuashi,jinhuashi,zhejiangsheng|jhs,jhs,zjs',
    '婺城区,金华市,浙江省|wuchengqu,jinhuashi,zhejiangsheng|wcq,jhs,zjs',
    '金东区,金华市,浙江省|jindongqu,jinhuashi,zhejiangsheng|jdq,jhs,zjs',
    '武义县,金华市,浙江省|wuyixian,jinhuashi,zhejiangsheng|wyx,jhs,zjs',
    '浦江县,金华市,浙江省|pujiangxian,jinhuashi,zhejiangsheng|pjx,jhs,zjs',
    '磐安县,金华市,浙江省|pananxian,jinhuashi,zhejiangsheng|pax,jhs,zjs',
    '兰溪市,金华市,浙江省|lanxishi,jinhuashi,zhejiangsheng|lxs,jhs,zjs',
    '义乌市,金华市,浙江省|yiwushi,jinhuashi,zhejiangsheng|yws,jhs,zjs',
    '东阳市,金华市,浙江省|dongyangshi,jinhuashi,zhejiangsheng|dys,jhs,zjs',
    '永康市,金华市,浙江省|yongkangshi,jinhuashi,zhejiangsheng|yks,jhs,zjs',
    '衢州市,衢州市,浙江省|quzhoushi,quzhoushi,zhejiangsheng|qzs,qzs,zjs',
    '柯城区,衢州市,浙江省|kechengqu,quzhoushi,zhejiangsheng|kcq,qzs,zjs',
    '衢江区,衢州市,浙江省|qujiangqu,quzhoushi,zhejiangsheng|qjq,qzs,zjs',
    '常山县,衢州市,浙江省|changshanxian,quzhoushi,zhejiangsheng|csx,qzs,zjs',
    '开化县,衢州市,浙江省|kaihuaxian,quzhoushi,zhejiangsheng|khx,qzs,zjs',
    '龙游县,衢州市,浙江省|longyouxian,quzhoushi,zhejiangsheng|lyx,qzs,zjs',
    '江山市,衢州市,浙江省|jiangshanshi,quzhoushi,zhejiangsheng|jss,qzs,zjs',
    '舟山市,舟山市,浙江省|zhoushanshi,zhoushanshi,zhejiangsheng|zss,zss,zjs',
    '定海区,舟山市,浙江省|dinghaiqu,zhoushanshi,zhejiangsheng|dhq,zss,zjs',
    '普陀区,舟山市,浙江省|putuoqu,zhoushanshi,zhejiangsheng|ptq,zss,zjs',
    '岱山县,舟山市,浙江省|daishanxian,zhoushanshi,zhejiangsheng|dsx,zss,zjs',
    '嵊泗县,舟山市,浙江省|shengsixian,zhoushanshi,zhejiangsheng|ssx,zss,zjs',
    '台州市,台州市,浙江省|taizhoushi,taizhoushi,zhejiangsheng|tzs,tzs,zjs',
    '椒江区,台州市,浙江省|jiaojiangqu,taizhoushi,zhejiangsheng|jjq,tzs,zjs',
    '黄岩区,台州市,浙江省|huangyanqu,taizhoushi,zhejiangsheng|hyq,tzs,zjs',
    '路桥区,台州市,浙江省|luqiaoqu,taizhoushi,zhejiangsheng|lqq,tzs,zjs',
    '玉环县,台州市,浙江省|yuhuanxian,taizhoushi,zhejiangsheng|yhx,tzs,zjs',
    '三门县,台州市,浙江省|sanmenxian,taizhoushi,zhejiangsheng|smx,tzs,zjs',
    '天台县,台州市,浙江省|tiantaixian,taizhoushi,zhejiangsheng|ttx,tzs,zjs',
    '仙居县,台州市,浙江省|xianjuxian,taizhoushi,zhejiangsheng|xjx,tzs,zjs',
    '温岭市,台州市,浙江省|wenlingshi,taizhoushi,zhejiangsheng|wls,tzs,zjs',
    '临海市,台州市,浙江省|linhaishi,taizhoushi,zhejiangsheng|lhs,tzs,zjs',
    '丽水市,丽水市,浙江省|lishuishi,lishuishi,zhejiangsheng|lss,lss,zjs',
    '莲都区,丽水市,浙江省|liandouqu,lishuishi,zhejiangsheng|ldq,lss,zjs',
    '青田县,丽水市,浙江省|qingtianxian,lishuishi,zhejiangsheng|qtx,lss,zjs',
    '缙云县,丽水市,浙江省|jinyunxian,lishuishi,zhejiangsheng|jyx,lss,zjs',
    '遂昌县,丽水市,浙江省|suichangxian,lishuishi,zhejiangsheng|scx,lss,zjs',
    '松阳县,丽水市,浙江省|songyangxian,lishuishi,zhejiangsheng|syx,lss,zjs',
    '云和县,丽水市,浙江省|yunhexian,lishuishi,zhejiangsheng|yhx,lss,zjs',
    '庆元县,丽水市,浙江省|qingyuanxian,lishuishi,zhejiangsheng|qyx,lss,zjs',
    '景宁畲族自治县,丽水市,浙江省|jingningshezuzizhixian,lishuishi,zhejiangsheng|jnszzzx,lss,zjs',
    '龙泉市,丽水市,浙江省|longquanshi,lishuishi,zhejiangsheng|lqs,lss,zjs',
];


/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^(([\u4E00-\u9FA5\uf900-\ufa2d\uFF00-\uFFEF]+),(([\u4E00-\u9FA5\uf900-\ufa2d]+),([\u4E00-\u9FA5\uf900-\ufa2d]+)))\|(\w+),(\w+),(\w+)\|(\w)\w*,(\w)\w*,(\w)\w*/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d\uFF00-\uFFEF]+),([\u4E00-\u9FA5\uf900-\ufa2d]+),([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-d]$/i, reg3 = /^[e-h]$/i, reg4 = /^[j-m]$/i,reg5 = /^[n-s]$/i,reg6 = /^[t-x]$/i,reg7 = /^[y-z]$/i;

    if (!Vcity.oCity) {
        Vcity.oCity = {ABCD:{},EFGH:{},JKLM:{},NOPQRS:{},TUVWX:{},YZ:{}};
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            // alert(match);
            // console.log(match);
            letter = match[9].toUpperCase();
            // console.log(letter);
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCD[letter]) Vcity.oCity.ABCD[letter] = [];
                Vcity.oCity.ABCD[letter].push(match);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.EFGH[letter]) Vcity.oCity.EFGH[letter] = [];
                Vcity.oCity.EFGH[letter].push(match);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.JKLM[letter]) Vcity.oCity.JKLM[letter] = [];
                Vcity.oCity.JKLM[letter].push(match);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.NOPQRS[letter]) Vcity.oCity.NOPQRS[letter] = [];
                Vcity.oCity.NOPQRS[letter].push(match);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.TUVWX[letter]) Vcity.oCity.TUVWX[letter] = [];
                Vcity.oCity.TUVWX[letter].push(match);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.YZ[letter]) Vcity.oCity.YZ[letter] = [];
                Vcity.oCity.YZ[letter].push(match);
            }

        }
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">支持中文／拼音／简拼输入</p>',
    '<ul>',
    '<li class="on">ABCD</li>',
    '<li>EFGH</li>',
    '<li>JKLM</li>',
    '<li>NOPQRS</li>',
    '<li>TUVWX</li>',
    '<li>YZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.province=Vcity._m.$('#'+options.province);
        this.city=Vcity._m.$('#'+options.city);
        this.area=Vcity._m.$('#'+options.area);
        // console.log(this.province+" "+this.city+" "+this.area);
        this.input = Vcity._m.$('#'+ input);

        var tipspan=this.tipspan=document.createElement('span');
        Vcity._m.addClass('hide',tipspan);
        tipspan.id='tipspan';
        tipspan.innerHTML='对不起，找不到该区域';
        Vcity._m.insertAfter(tipspan,this.input);

        this.inputEvent();
    },


    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框，并给输入框填充内容
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.div)Vcity._m.addClass('hide', that.div);
            var value = Vcity._m.trim(that.input.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value+"|,"+value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    Vcity._m.removeClass('hide',that.tipspan);
                    Vcity._m.addClass('tipspan',that.tipspan);
                    Vcity._m.addClass('input-error',that.input);
                }else{

                    var lis = Vcity._m.$('li',that.div);
                    // console.log(lis);
                    // console.log(that.hasvalue);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1&&that.hasvalue==false){
                            that.input.value = bs[0].innerHTML;
                        }
                    }else{
                        if(that.hasvalue==false) {
                            that.input.value = '';
                        }
                    }
                }
            }
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.id='cityFather';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 1000;
        Vcity._m.on(div,'click',function(event){
            that.input.focus();
        });
        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var abCity = this.abCity =  document.createElement('div');
        abCity.className = 'abCity';
        childdiv.appendChild(abCity);
        div.appendChild(childdiv);
        this.createabCity();
    },

    /* *
     * @createabCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createabCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;

        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'ab'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    if(oCity[key][sortKey[j]][i][2]!='鼓楼区') {
                        str = '<a href="javascript:void(0)">' + oCity[key][sortKey[j]][i][2] + '<span class="hide">' + oCity[key][sortKey[j]][i][3] + '</span>' + '</a>';
                        odda.push(str);
                    }else{
                        str = '<a href="javascript:void(0)">' + oCity[key][sortKey[j]][i][2] +'（'+oCity[key][sortKey[j]][i][4]+'）'+ '<span class="hide">' + oCity[key][sortKey[j]][i][3] + '</span>' + '</a>';
                        odda.push(str);
                    }
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            Vcity._m.removeClass('hide',this.ABCD);
            this.abCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        //定位方向
        var mTop = Vcity._m.getPos( this.input).top;
        var rHeight= this.rootDiv.offsetHeight;
        var iHeight= this.input.offsetHeight;
        var clientHeight=document.body.clientHeight;
        if(mTop+rHeight+iHeight>clientHeight&&mTop-rHeight>0){
            this.rootDiv.style.top =Vcity._m.getPos( this.input).bottom-rHeight-iHeight -1+ 'px';
        }else{
            this.rootDiv.style.top = Vcity._m.getPos( this.input).bottom + 1 + 'px';
        }
        this.rootDiv.style.left = Vcity._m.getPos( this.input).left + 'px';
        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var that=this;
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.abCity);
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                //定位方向
                var mTop = Vcity._m.getPos( that.input).top;
                var rHeight=that.rootDiv.offsetHeight;
                var iHeight=that.input.offsetHeight;
                var clientHeight=document.body.clientHeight;
                if(mTop+rHeight+iHeight>clientHeight&&mTop-rHeight>0){
                    that.rootDiv.style.top =Vcity._m.getPos(that.input).bottom-rHeight-iHeight-1 + 'px';
                }else{
                    that.rootDiv.style.top = Vcity._m.getPos(that.input).bottom + 1 + 'px';
                }
                that.rootDiv.style.left = Vcity._m.getPos( that.input).left + 'px';
            };
        }

    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.abCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML.replace('<span class="hide">',',').replace('</span>','').replace(/（.+?）/,'');
                Vcity._m.triggerEvent(that.input);
                that.hasvalue=true;
                Vcity._m.addClass('hide',that.cityBox);
                if(that.province){
                    that.province.value=that.input.value.split(',')[2];
                }
                if(that.city){
                    that.city.value=that.input.value.split(',')[1];
                }
                if(that.area){
                    that.area.value=that.input.value.split(',')[0];
                }

            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        // console.log('城市输入框事件');
        var that = this;

        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;

            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.div || (that.div && Vcity._m.hasClass('hide',that.div))){
                    Vcity._m.removeClass('hide',that.cityBox);
                    //定位方向
                    var mTop = Vcity._m.getPos( that.input).top;

                    var rHeight=that.rootDiv.offsetHeight;
                    var iHeight=that.input.offsetHeight;
                    var clientHeight=document.body.clientHeight;

                    if(mTop+rHeight+iHeight>clientHeight&&mTop-rHeight>0){
                        that.rootDiv.style.top =Vcity._m.getPos(that.input).bottom-rHeight-iHeight -1+ 'px';
                    }else{
                        that.rootDiv.style.top = Vcity._m.getPos(that.input).bottom + 1+ 'px';
                    }
                    that.rootDiv.style.left = Vcity._m.getPos(that.input).left + 'px';
                }
            }
        });
        Vcity._m.on(this.input,'focus',function(){
            that.input.select();
            Vcity._m.addClass('hide',that.tipspan);
            Vcity._m.removeClass('input-error',that.input);

        });
        Vcity._m.on(this.input,'input',function(event){
            Vcity._m.addClass('hide',that.cityBox);
            Vcity._m.removeClass('input-error',that.input);
            Vcity._m.addClass('hide',that.tipspan);
            if(event.keyCode!=13&&event.keyCode!=40&&event.keyCode!=38) {
                that.createUl();
            }

        });
        Vcity._m.on(this.input,'keydown',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            if(event.keyCode==13||event.keyCode==40||event.keyCode==38) {
                if(that.div && !Vcity._m.hasClass('hide',that.div) && !that.isEmpty){
                    that.KeyboardEvent(event,keycode);
                }
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        // console.log('生成下拉选择列表');
        var str;
        var value = Vcity._m.trim(this.input.value);
        if (value !== '') {
            var reg = new RegExp("" + value + "|\\|" + value+"|,"+value, 'gi');
            var reg1=new RegExp("" + value + "|\\|" + value+"|,"+value, 'i');
            // var reg = new RegExp("^" + value + "|\\|" + value+"|,"+value, 'gi');
            // var reg1=new RegExp("^" + value + "|\\|" + value+"|,"+value, 'i');
            var searchResult = [];
            var searchprovince=[];
            var searchcity=[];
            var searcharea=[];
            var k=0;
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);

                        var index=-1;
                        var teststr=reg1.exec(Vcity.allCity[i])[0].replace(',','').replace('|','');
                        var array=reg1.exec(Vcity.allCity[i]).input.split("\|");
                        for(var q=0;q<array.length;q++){
                            var arrayin=array[q].split(',');
                            for(var w=0;w<arrayin.length;w++){
                                var stri=arrayin[w];
                                if(stri.indexOf(teststr)!=-1){
                                    index=w;
                                    break;
                                }
                            }
                        }
                    if(index==0){
                        searcharea.push(match);
                    }
                    if(index==1){
                        searchcity.push(match);
                    }
                    if(index==2){
                        searchprovince.push(match);
                    }
                }
            }
            // console.log(searcharea)
            if(searcharea.length!=0){
                str=searcharea[0][1];
            }
            if(searchcity.length!=0) {
                str = searchcity[0][1].split(',')[1] + ',' + searchcity[0][1].split(',')[2];
            }
            if(searchprovince.length!=0) {
                str = searchprovince[0][1].split(',')[2];
            }
            this.resultLength=searcharea.length+searchcity.length+searchprovince.length;
            str='<div class="sildetop"><span class="sildemore">'+value+'，若要缩小范围，请输入更多条件'+'</span>' +
                '<span class="citynow">'+str+'</span></div>';

            var matches=searchResult.concat(searchprovince).concat(searchcity).concat(searcharea);
            searchResult.push(str);
            // console.log(searchResult);

            for(var i=0;i<matches.length;i++){
                if(k%5==0) {
                    if (searchResult.length !== 1) {
                        str = '</div><div class="hide" id="page'+(parseInt(k/5)+1)+'">' + '<li><b class="cityname">' + matches[i][1] + '</b><b class="cityspell">' + matches[i][6] + '</b></li>';
                    } else {
                        str = '<div id="page'+((k/5)+1)+'">' + '<li ><b class="cityname">' + matches[i][1] + '</b><b class="cityspell">' + matches[i][6] + '</b></li>';
                        this.k=1;
                    }
                }else{
                    if (searchResult.length !== 1) {
                        str = '<li><b class="cityname">' + matches[i][1] + '</b><b class="cityspell">' + matches[i][6] + '</b></li>';
                    } else {
                        str = '<li ><b class="cityname">' + matches[i][1] + '</b><b class="cityspell">' + matches[i][6] + '</b></li>';
                    }

                }
                searchResult.push(str);
                k++;
            }

            this.isEmpty = 0;
            // 如果搜索数据为空
            if (searchResult.length == 1) {
                this.isEmpty = 1;
                Vcity._m.removeClass('hide',this.tipspan);
            }else{
                searchResult.push('</div>');
                var page=this.page=parseInt((parseInt(k)+ 5 -1) / 5);

                str='<div id="pagediv"><li class="hide"><--</li>';
                this.pagemax=page;
                this.pagemin=1;
                if(this.page>5) {
                    for (var m = 1; m <= 5; m++) {
                        str = str + '<li>' + m + '</li>';
                    }
                }else{
                    for (var m = 1; m <= this.page; m++) {
                        str = str + '<li>' + m + '</li>';

                    }
                }
                if(this.page==1) {
                    str = str + '</div>';
                }else{
                    str = str + '<li>--></li></div>';
                }
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if(!this.div){
                var div= this.div =document.createElement('div');
                div.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(div);
                this.count = 0;
            } else if (this.div && Vcity._m.hasClass('hide', this.div)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.div);
            }
            if(this.isEmpty==1){
                Vcity._m.addClass('input-error',this.input);
                Vcity._m.addClass('tipspan',this.tipspan);
                Vcity._m.removeClass('hide',this.tipspan);
                Vcity._m.addClass('hide', this.div);
            }
            this.div.innerHTML = searchResult.join('');
            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.div);
            Vcity._m.removeClass('hide',this.cityBox);

        }
        //定位方向
        var mTop = Vcity._m.getPos( this.input).top;

        var rHeight= this.rootDiv.offsetHeight;
        var iHeight= this.input.offsetHeight;
        var clientHeight=document.body.clientHeight;
        if(mTop+rHeight+iHeight>clientHeight&&mTop-rHeight>0){
            this.rootDiv.style.top =Vcity._m.getPos( this.input).bottom-rHeight-iHeight -1+ 'px';
        }else{
            this.rootDiv.style.top = Vcity._m.getPos( this.input).bottom + 1 + 'px';
        }
        this.rootDiv.style.left = Vcity._m.getPos( this.input).left + 'px';
    },



    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        // console.log('键盘事件');
        var lis = Vcity._m.$('li',this.div);
        var that=this;
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count===that.resultLength){
                    this.count--;
                }
                if(this.count%5==0&&this.pagemax!=1){
                    this.pageDeal(parseInt(that.k)+1);
                }
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }

                if(lis[this.count].parentNode.id=='pagediv'){
                    Vcity._m.addClass('on',lis[--this.count]);
                }else{
                    Vcity._m.addClass('on',lis[this.count]);
                }
                this.cityresult=lis[this.count].innerHTML;
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = 0;
                if((this.count+1)%5==0&&this.count!=-1){
                    this.pageDeal(parseInt(that.k)-1);
                }
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                this.cityresult=lis[this.count].innerHTML;
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(this.cityresult)[0];
                Vcity._m.addClass('hide',this.div);
                Vcity._m.addClass('hide',this.div);
                this.hasvalue=true;
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表分页
     * @ pageDeal
     * */
    pageDeal:function(pageclick){
        // console.log('下拉列表分页'+pageclick);
        var that=this;
        if (that.pagemax - that.pagemin >= 4) {
            var min = that.pagemin;
            var max = that.pagemax;
            if (pageclick > 2) {
                if (that.pagemax - pageclick >= 2) {
                    max = parseInt(pageclick) + 2;
                } else {
                    max = that.pagemax;
                }
                min=max-4;
            } else {
                min = 1;
                max = parseInt(min) + 4;
            }
            for(var ind=0;ind<=(max-min);ind++){
                var pagelis=Vcity._m.$('li',Vcity._m.$('#pagediv',this.div));
                pagelis[ind+1].innerHTML=min+ind;
            }
        }
        var len=Vcity._m.$('li',Vcity._m.$('#pagediv',that.div)).length;
        if(pageclick>1&&pageclick<that.pagemax){
            Vcity._m.addClass('hide', Vcity._m.$('#page' + that.k,that.div));
            Vcity._m.removeClass('hide',Vcity._m.$('#page' + pageclick,that.div) );
            that.k = pageclick;
            Vcity._m.removeClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[len-1]);
            Vcity._m.removeClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[0]);
        }else if (pageclick<=1){
            Vcity._m.addClass('hide', Vcity._m.$('#page' + that.k,that.div));
            Vcity._m.removeClass('hide',Vcity._m.$('#page' + 1,that.div) );
            that.k = 1;
            Vcity._m.removeClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[len-1]);
            Vcity._m.addClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[0]);
        }else{
            Vcity._m.addClass('hide', Vcity._m.$('#page' + that.k,that.div));
            Vcity._m.removeClass('hide',Vcity._m.$('#page' + that.pagemax,that.div) );
            that.k = that.pagemax;
            Vcity._m.removeClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[0]);
            Vcity._m.addClass('hide',  Vcity._m.$('li',Vcity._m.$('#pagediv',that.div))[len-1]);
        }
        var lis = Vcity._m.$('li',that.div);
        var len = lis.length;
        for (var i = 0; i < len; i++) {
            Vcity._m.removeClass('on', lis[i]);
        }
        that.count=(that.k-1)*5;
        Vcity._m.addClass('on', lis[that.count]);


    },
    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        // console.log('下拉列表的li事件');
        var that = this;
        that.hasvalue=false;
        var lis = Vcity._m.$('li',this.div);
        Vcity._m.addClass('on',Vcity._m.$('li',Vcity._m.$('#page1',this.div))[0]);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                if(target.innerHTML.indexOf(',')!=-1){
                    that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                    Vcity._m.triggerEvent(that.input);
                    that.hasvalue=true;
                    Vcity._m.addClass('hide',that.div);
                    if(that.province){
                        that.province.value=that.input.value.split(',')[2];
                    }
                    if(that.city){
                        that.city.value=that.input.value.split(',')[1];
                    }
                    if(that.area){
                        that.area.value=that.input.value.split(',')[0];
                    }
                }
                else{
                    if(target.innerHTML.indexOf('&lt;--')!=-1) {
                        that.pageDeal(parseInt(that.k)-1);
                    }else if(target.innerHTML.indexOf('--&gt;')!=-1){
                        that.pageDeal(parseInt(that.k)+1);
                    }else {
                        that.pageDeal(target.innerHTML);
                    }
                }
            });
            if(lis[i].parentNode.id!='pagediv') {
                Vcity._m.on(lis[i], 'mouseenter', function (event) {
                    event = Vcity._m.getEvent(event);
                    var target = Vcity._m.getTarget(event);
                    var len = lis.length;
                    for (var i = 0; i < len; i++) {
                        if(target===lis[i]){
                            that.count=i;
                        }
                        Vcity._m.removeClass('on', lis[i]);
                    }
                    Vcity._m.addClass('on', target);
                    that.cityresult = target.innerHTML;

                });
            }

        }
    },


};
