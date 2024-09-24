<?php !defined('install') && exit(); ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>likeadmin安装</title>
        <link rel="stylesheet" type="text/css" href="./css/layui.css"/>
        <link rel="stylesheet" type="text/css" href="./css/mounted.css"/>
        <link rel="shortcut icon" href="./favicon.ico"/>
    </head>

    <body>
    <div class="header">
        <div class="logo" style="width: 220px;">
            <img src="./images/slogn.png?v=1"/>
        </div>
    </div>
    <div class="mounted" id="mounted">
        <div class="mounted-box">
            <form method="post" action="#" name="main_form">
                <div class="mounted-container" id="tab">
                    <div class="mounted-nav-container">
                        <ul class="mounted-nav" id="nav">
                            <li <?php if ($step == "1") { ?>class="active" <?php } ?>>许可协议</li>
                            <li <?php if ($step == "2") { ?>class="active" <?php } ?>>环境监测</li>
                            <li <?php if ($step == "3") { ?>class="active" <?php } ?>>参数配置</li>
                            <li <?php if ($step == "4" or $step == '5') { ?>class="active" <?php } ?>>安装</li>
                        </ul>
                    </div>

                    <!-- 阅读许可 -->
                    <?php if ($step == '1') { ?>
                        <div class="mounted-content-item show">
                            <div class="content-header">
                                阅读许可协议
                            </div>
                            <div class="content">
                                <h2>likeadmin应用授权协议</h2>
                                <div class="white-space;pre">

                                </div>

                                <p class="mt16">
                                    likeadmin在此特别提醒您（用户）在订阅使用likeadmin软件系统（以下简称“应用”）之前，请认真阅读本《likeadmin应用授权协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录、购买或使用本协议所涉服务。您的注册、登录、购买、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
                                </p>
                                <p class="mt16">
                                    本协议约定likeadmin官网与用户之间的权利义务。“用户”是指注册、登录、订阅或使用likeadmin应用的个人或企业。本协议可由likeadmin官网随时更新，更新后的协议条款一旦公布即代替原来的协议条款，不再另行通知，用户可在本网站查阅最新版协议条款。在likeadmin官网修改协议条款后，如果用户不接受修改后的条款，请立即停止使用likeadmin官网提供的服务，用户继续使用likeadmin官网提供的服务将被视为接受修改后的协议。
                                </p>
                                <h3 class="mt16">一、订阅应用</h3>
                                <p class="mt16">
                                    1、用户可以在likeadmin官网在线订阅likeadmin付费应用，购买时需提前注册好likeadmin官网账号。
                                    <br>
                                    2、用户以likeadmin官网允许的支付方式订阅likeadmin付费应用时，用户应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若用户不具备前述主体资格，则用户及用户的监护人应承担因此而导致的一切后果，同时likeadmin官网将保留追究用户及其监护人民事、刑事责任等权利，且likeadmin官网有权注销(永久冻结)用户的likeadmin官网帐号，并有权向用户及用户的监护人索赔。
                                    <br>
                                    3、用户应当在订阅使用likeadmin付费应用之前认真阅读全部协议内容。用户确认likeadmin官网对协议中所含免除或限制其责任的条款已尽提示、说明义务，用户同意此等条款，用户如对协议内容有任何异议的，应向likeadmin官网咨询。但无论用户事实上是否在订阅或使用likeadmin付费应用之前认真阅读了本协议内容，只要用户订阅或使用likeadmin付费应用，即与likeadmin官网缔结了本协议，本协议即对用户产生约束，届时用户不应以未阅读本协议的内容或者未获得likeadmin官网对用户问询的解答等理由，主张本协议无效或要求撤销本协议。
                                    <br>
                                    4、用户承诺接受并遵守本协议的约定。如果用户不同意本协议的约定，应立即停止购买使用likeadmin付费应用。
                                    <br>
                                    5、likeadmin官网有权根据需要不时地制订、修改本协议或各类规则，并以公示的方式进行公告，不再单独通知用户。变更后的协议和规则一经公布后，立即自动生效。如用户不同意相关变更，应当立即停止使用likeadmin付费应用。用户继续订阅或使用likeadmin付费应用，即表示用户接受经修订的协议。
                                    <br>
                                </p>

                                <h3 class="mt16">二、应用下载</h3>
                                <p class="mt16">
                                    1、用户可以在likeadmin官网在线下载likeadmin应用。 <br>
                                    2、likeadmin付费应用需要在注册登录且订阅后才可以下载安装使用。 <br>
                                </p>

                                <h3 class="mt16">三、应用使用</h3>
                                <p class="mt16">
                                    1、likeadmin应用禁止在各类平台以任何形式（包括二次修改后）进行二次分发（出售）。<br>
                                    2、基于likeadmin应用从事的一切商业行业和本站无关。<br>
                                    3、likeadmin应用禁止分享、复制、转售和传播。<br>
                                    4、likeadmin应用只支持中国大陆及港澳台地区安装使用。<br>
                                    5、likeadmin付费应用务必正确录入授权主体信息后再进行使用。<br>
                                    6、用户不得利用likeadmin应用制作、上载、复制、发布、传播如下法律、法规和政策禁止的内容：<br>
                                    (1) 反对宪法所确定的基本原则的；<br>
                                    (2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br>
                                    (3) 损害国家荣誉和利益的；<br>
                                    (4) 煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                                    (5) 破坏国家宗教政策，宣扬邪教和封建迷信的；<br>
                                    (6) 散布谣言，扰乱社会秩序，破坏社会稳定的；<br>
                                    (7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                                    (8) 侮辱或者诽谤他人，侵害他人合法权益的；<br>
                                    (9) 不遵守法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的；<br>
                                    (10) 含有法律、行政法规禁止的其他内容的信息。<br>

                                    如果用户违反相关上述相关使用条例，likeadmin官网有权利收回用户订阅的付费应用和用户在likeadmin官网注册的账号，如果有违反法律、法规和政策禁用的内容进行使用的，likeadmin官网有权向公安机关举报并配合公安机关提供用户相关隐私个人信息。
                                </p>

                                <h3 class="mt16">四、应用更新</h3>
                                <p class="mt16">
                                    1、在更新likeadmin应用到最新版本时，请做好当前应用版本的整站备份，likeadmin不对应用更新升级造成的损失承担任何责任。<br>
                                    2、如因likeadmin应用下架造成的应用无法更新，likeadmin不承担任何责任。<br>
                                    3、如因likeadmin应用开发商放弃更新应用造成的无法更新，likeadmin不承担任何责任。<br>
                                </p>

                                <h3 class="mt16">五、应用价格</h3>
                                <p class="mt16">
                                    1、应用金额以最终结算价格为准，已售出的付费应用不做任何差价补偿。<br>
                                    2、如果利用系统漏洞或用户使用特殊手段以低价或免费的形式购买的应用，likeadmin有权收回售出的应用。<br>
                                </p>

                                <h3 class="mt16">六、应用授权</h3>
                                <p class="mt16">
                                    1、likeadmin付费应用可用于个人或企业自营网站应用，可用于外包开发，禁止二次转售应用源码。<br>
                                </p>

                                <h3 class="mt16">七、退款和转让</h3>
                                <p class="mt16">
                                    1、likeadmin付费应用因提供全部源码，且源码可以拷贝，购买后不提供任何原因退款，请在购买前慎重考虑和仔细阅读此协议。<br>
                                    2、likeadmin付费应用如果价格发生变动，此前购买的应用不提供任何的补偿或退款。<br>
                                    3、likeadmin付费应用禁止以任何形式进行转让和出售。<br>
                                </p>

                                <h3 class="mt16">八、知识产权声明</h3>
                                <p class="mt16">
                                    1、likeadmin应用源代码所有权和著作权归应用开发商所有。<br>
                                    2、除另有特别声明外，likeadmin应用所依托的代码、文字、图片等著作权、专利权及其他知识产权均归其开发商所有。<br>
                                </p>

                                <h3 class="mt16">九、法律责任</h3>
                                <p class="mt16">
                                    1、如果likeadmin官网发现或收到他人举报或投诉用户违反本协议约定的，likeadmin官网有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规帐号处以包括但不限于警告、帐号封禁、设备封禁、功能封禁的处罚。<br>
                                    2、用户理解并同意，likeadmin官网有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。<br>
                                    3、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿likeadmin官网与合作公司、关联公司，并使之免受损害。<br>
                                </p>

                                <h3 class="mt16">十、不可抗力及其他免责事由</h3>
                                <p class="mt16">
                                    1、用户理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，likeadmin官网将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，likeadmin官网及合作单位在法律允许的范围内免责。<br>
                                    2、本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等等。用户应加强信息安全及使用者资料的保护意识，要注意加强帐号保护，以免遭致损失和骚扰。<br>
                                    3、用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，likeadmin官网不承担任何责任。<br>
                                    4、用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户或第三方的任何损失，likeadmin官网不承担任何责任。<br>
                                    5、用户理解并确认，likeadmin官网需要定期或不定期地对likeadmin官网平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，likeadmin官网无需为此承担任何责任。<br>
                                    6、likeadmin官网依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成likeadmin官网的义务或承诺，likeadmin官网不能保证及时发现违法违规或违约行为或进行相应处理。<br>
                                    7、用户理解并确认，对于likeadmin官网向用户提供的下列产品或者服务的质量缺陷及其引发的任何损失，likeadmin官网无需承担任何责任：<br>
                                    (1) likeadmin官网向用户免费提供的服务；<br>
                                    (2) likeadmin官网向用户赠送的任何产品或者服务。<br>
                                    8、在任何情况下，likeadmin官网均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用likeadmin官网或本服务而遭受的利润损失，承担责任（即使likeadmin官网已被告知该等损失的可能性亦然）。尽管本协议中可能含有相悖的规定，likeadmin官网对用户承担的全部责任，无论因何原因或何种行为方式，始终不超过用户因使用likeadmin官网提供的服务而支付给likeadmin官网的费用(如有)。<br>
                                </p>

                                <h3 class="mt16">十一、服务的变更、中断、终止</h3>
                                <p class="mt16">
                                    1、鉴于网络服务的特殊性，用户同意likeadmin官网有权随时变更、中断或终止部分或全部的服务（包括收费服务）。likeadmin官网变更、中断或终止的服务，likeadmin官网应当在变更、中断或终止之前通知用户。<br>
                                    2、如发生下列任何一种情形，likeadmin官网有权变更、中断或终止向用户提供的免费服务或收费服务，而无需对用户或任何第三方承担任何责任：<br>
                                    (1) 根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；<br>
                                    (2) 用户违反相关法律法规或本协议的约定；<br>
                                    (3) 按照法律规定或有权机关的要求；<br>
                                    (4) 出于安全的原因或其他必要的情形。<br>
                                </p>

                                <h3 class="mt16">十二、其他</h3>
                                <p class="mt16">
                                    1、likeadmin官网郑重提醒用户注意本协议中免除likeadmin官网责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。<br>
                                    2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和likeadmin官网之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交likeadmin官网住所地有管辖权的人民法院管辖。<br>
                                    3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。<br>
                                </p>
                            </div>
                        </div>
                    <?php } ?>

                    <!-- 检查信息 -->
                    <?php if ($step == '2') { ?>
                        <div class="mounted-content-item show">
                            <div class="mounted-env-container">
                                <div class="mounted-item">
                                    <div class="content-header">
                                        服务器信息
                                    </div>
                                    <div class="content-table">
                                        <table class="layui-table" lay-skin="line">
                                            <colgroup>
                                                <col width="210">
                                                <col width="730">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>参数</th>
                                                <th>值</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>服务器操作系统</td>
                                                <td><?php echo PHP_OS ?></td>
                                            </tr>
                                            <tr>
                                                <td>web服务器环境</td>
                                                <td><?php echo $_SERVER['SERVER_SOFTWARE']; ?></td>
                                            </tr>
                                            <tr>
                                                <td>PHP版本</td>
                                                <td><?php echo @phpversion(); ?></td>
                                            </tr>
                                            <tr>
                                                <td>程序安装目录</td>
                                                <td><?php echo realpath(__DIR__ . '../../../'); ?></td>
                                            </tr>
                                            <tr>
                                                <td>磁盘空间</td>
                                                <td><?php echo $modelInstall->freeDiskSpace(realpath(__DIR__ . '../../../')) ?></td>
                                            </tr>
                                            <tr>
                                                <td>上传限制</td>
                                                <?php if (ini_get('file_uploads')): ?>
                                                    <td><?php echo ini_get('upload_max_filesize'); ?></td>
                                                <?php else: ?>
                                                    <td>禁止上传</td>
                                                <?php endif; ?>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="mounted-tips mt16">
                                    PHP环境要求必须满足下列所有条件，否则系统或系统部分功能将无法使用。
                                </div>
                                <div class="mounted-item mt16">
                                    <div class="content-header">
                                        PHP环境要求
                                    </div>
                                    <div class="content-table">
                                        <table class="layui-table" lay-skin="line">
                                            <colgroup>
                                                <col width="210">
                                                <col width="210">
                                                <col width="120">
                                                <col width="400">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>选项</th>
                                                <th>要求</th>
                                                <th>状态</th>
                                                <th>说明及帮助</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>PHP版本</td>
                                                <td>大于8.0</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkPHP()) ?>
                                                <td>建议使用PHP8.0.8版本</td>
                                            </tr>
                                            <tr>
                                                <td>PDO_MYSQL</td>
                                                <td>支持 (强烈建议支持)</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkPDOMySQL()) ?>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>allow_url_fopen</td>
                                                <td>支持 (建议支持cURL)</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkCurl()) ?>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>GD2</td>
                                                <td>支持</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkGd2()) ?>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>DOM</td>
                                                <td>支持</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDom()) ?>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>fileinfo</td>
                                                <td>支持</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkFileInfo()) ?>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>session.auto_start</td>
                                                <td>关闭</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkSessionAutoStart()) ?>
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="mounted-tips mt16">
                                    系统要求likeadmin安装目录下的runtime和upload必须可写，才能使用likeadmin的所有功能。
                                </div>
                                <div class="mounted-item mt16">
                                    <div class="content-header">
                                        目录权限监测
                                    </div>
                                    <div class="content-table">
                                        <table class="layui-table" lay-skin="line">
                                            <colgroup>
                                                <col width="210">
                                                <col width="210">
                                                <col width="120">
                                                <col width="400">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>目录</th>
                                                <th>要求</th>
                                                <th>状态</th>
                                                <th>说明及帮助</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>/runtime</td>
                                                <td>runtime目录可写</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDirWrite('runtime')) ?>
                                                <td><?php if ($modelInstall->checkDirWrite('runtime') == 'fail') echo '请给runtime目录权限，若目录不存在先新建'; ?></td>
                                            </tr>
                                            <tr>
                                                <td>/public/uploads</td>
                                                <td>uploads目录可写</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDirWrite('public/uploads')) ?>
                                                <td><?php if ($modelInstall->checkDirWrite('public/uploads') == 'fail') echo '请给public/uploads目录权限，若目录不存在先新建'; ?></td>
                                            </tr>
                                            <tr>
                                                <td>/public/admin</td>
                                                <td>admin目录可写</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDirWrite('public/admin')) ?>
                                                <td><?php if ($modelInstall->checkDirWrite('public/admin') == 'fail') echo '请给public/admin，若目录不存在先新建'; ?></td>
                                            </tr>
                                            <tr>
                                                <td>../config</td>
                                                <td>config目录可写</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDirWrite('config')) ?>
                                                <td><?php if ($modelInstall->checkDirWrite('config') == 'fail') echo '请给config目录权限，若目录不存在先新建'; ?></td>
                                            </tr>
                                            <tr>
                                                <td>../.env</td>
                                                <td>.env文件可写</td>
                                                <?php echo $modelInstall->correctOrFail($modelInstall->checkDirWrite('.env')) ?>
                                                <td><?php if ($modelInstall->checkDirWrite('.env') == 'fail') echo '请给.env文件权限，若文件不存在，注意文件名第1字符是" . "'; ?></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php } ?>

                    <!-- 数据库设置 -->
                    <?php if ($step == '3') { ?>
                        <div class="mounted-content-item show">
                            <div class="mounted-item">
                                <div class="content-header">
                                    数据库选项
                                </div>
                                <div class="content-form">

                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            数据库主机
                                        </div>
                                        <div>
                                            <input type="text" name="host" value="<?= $post['host'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            端口号
                                        </div>
                                        <div>
                                            <input type="text" name="port" value="<?= $post['port'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            数据库用户
                                        </div>
                                        <div>
                                            <input type="text" name="user" value="<?= $post['user'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            数据库密码
                                        </div>
                                        <div>
                                            <input type="text" name="password" value="<?= $post['password'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            数据库名称
                                        </div>
                                        <div>
                                            <input type="text" name="name" value="<?= $post['name'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            数据表前缀
                                        </div>
                                        <div>
                                            <input type="text" name="prefix" value="<?= $post['prefix'] ?>"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mounted-item">
                                <div class="content-header mt16">
                                    管理选项
                                </div>
                                <div class="content-form">

                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            管理员账号
                                        </div>
                                        <div>
                                            <input type="text" name="admin_user" value="<?= $post['admin_user'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            管理员密码
                                        </div>
                                        <div>
                                            <input type="password" name="admin_password"
                                                   value="<?= $post['admin_password'] ?>"/>
                                        </div>
                                    </div>
                                    <div class="form-box-item">
                                        <div class="form-desc">
                                            确认密码
                                        </div>
                                        <div>
                                            <input type="password" name="admin_confirm_password"
                                                   value="<?= $post['admin_confirm_password'] ?>"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php } ?>

                    <!-- 安装中 -->
                    <?php if ($step == '4' or $step == '5') { ?>
                        <div class="mounted-content-item show">
                            <?php if ($step == '4') { ?>
                                <div id="mounting">
                                    <div class="content-header">
                                        正在安装中
                                    </div>
                                    <div class="mounting-container " id="install_message">
                                        <?php if (count($successTables) > 0): ?>
                                            <p style="margin-bottom: 4px;">成功创建数据库：<?= $post['name'] ?></p>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            <?php } ?>

                            <?php if ($step == '5') { ?>
                                <div class="show" id="mounting-success">
                                    <div class="content-header">
                                        安装成功
                                    </div>
                                    <div class="success-content">
                                        <div style="width: 48px;height: 48px;">
                                            <img src="./images/icon_mountSuccess.png"/>
                                        </div>
                                        <div class="mt16 result">安装完成，进入管理后台</div>
                                        <div style="margin-top: 10px;font-size:14px;color: #444444">版本号：1.9.4</div>
                                        <div class="tips">
                                            为了您站点的安全，安装完成后即可将网站根目录下的“install”文件夹删除，或者config/目录下创建install.lock文件防止重复安装。
                                        </div>
                                        <div class="btn-group">
                                            <a class="btn" href="/admin/" style="margin-left: 20px;">进入管理平台</a>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    <?php } ?>
                </div>
            </form>
            <?php if ($step == '1') { ?>
                <div class="item-btn-group show">
                    <button class="accept-btn" onclick="goStep(<?php echo $nextStep ?>)">我已阅读并同意</button>
                </div>
            <?php } elseif (in_array($step, ['2', "3"])) { ?>
                <div class="item-btn-group show">
                    <button class="cancel-btn" onclick="cancel()" style="padding: 7px 63px;margin-right: 16px">返回
                    </button>
                    <?php if ($modelInstall->getAllowNext()): ?>
                        <button class="accept-btn" onclick="goStep(<?php echo $nextStep ?>)" style="padding: 7px 63px;">
                            继续
                        </button>
                    <?php else: ?>
                        <button class="accept-btn" onclick="goStep(<?php echo $step ?>)" style="padding: 7px 63px;">重新检查
                        </button>
                    <?php endif; ?>
                </div>
            <?php } elseif ($step == "4") { ?>
                <div class="item-btn-group show">
                    <button class="disabled-btn" disabled="disabled">
                        <div class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></div>
                        <div style="font-size: 14px;margin-left: 7px;">正在安装中...</div>
                    </button>
                </div>
            <?php } ?>
        </div>
    </div>
    <footer>
        Copyright © 2019-<?= date('Y') ?> 广州好象科技有限公司 粤ICP备16101670号-2
    </footer>
    <script src="./js/layui.js"></script>
    <?php if (count($successTables) > 0): ?>
        <script>
            var successTables = eval(<?= json_encode($successTables) ?>);
        </script>
    <?php endif; ?>
    <script src="./js/mounted.js"></script>
    </body>

    </html>
<?php if ($message != ''): ?>
    <script>
        alert('<?= $message; ?>');
    </script>
<?php endif; ?>