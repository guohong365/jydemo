﻿(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('532300', { "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": { "name": "楚雄市", "id": "532301" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.402298613281, 25.3094020820313], [101.422164335938, 25.278637921875], [101.441727324219, 25.2794142890626], [101.442579375, 25.2579567695313], [101.412535429688, 25.2301222968751], [101.422489042969, 25.2182546210938], [101.478309355469, 25.2204665351563], [101.502535429688, 25.2090334296875], [101.531964140625, 25.1934621406251], [101.562535429688, 25.1790334296876], [101.576676054688, 25.1490724921875], [101.647345, 25.173843], [101.684823027344, 25.1674758125], [101.713148222656, 25.1292726875], [101.709871855469, 25.10710471875], [101.72170046875, 25.0781984687501], [101.73298953125, 25.06948753125], [101.742594023438, 25.046020734375], [101.789144316406, 25.026968], [101.810545683594, 24.9535695625], [101.74298953125, 24.9259206367188], [101.75170046875, 24.91819846875], [101.799515410156, 24.908110578125], [101.817345, 24.863843], [101.81197390625, 24.8592140937501], [101.794437285156, 24.83886253125], [101.75197390625, 24.82921409375], [101.706302519531, 24.7934474921875], [101.689229765625, 24.8132643867187], [101.662323027344, 24.7982521796876], [101.607784453125, 24.8322927070313], [101.539412871094, 24.7757399726562], [101.485738554688, 24.7954494453125], [101.50297, 24.7485280585938], [101.4619153125, 24.7392018867188], [101.464364042969, 24.7087209296875], [101.400731230469, 24.6990261054688], [101.42271609375, 24.68921409375], [101.432977324219, 24.6662209296875], [101.452772246094, 24.6491677070313], [101.4519153125, 24.6384889960938], [101.48271609375, 24.6292140937501], [101.49197390625, 24.6226003242188], [101.46197390625, 24.60921409375], [101.43271609375, 24.5884719062501], [101.332401152344, 24.570171125], [101.32271609375, 24.54847190625], [101.31197390625, 24.53921409375], [101.30271609375, 24.5184719062501], [101.266102324219, 24.49921409375], [101.252345, 24.5300490546876], [101.232042265625, 24.5284157539063], [101.19271609375, 24.5592140937501], [101.145794707031, 24.56847190625], [101.10271609375, 24.5184719062501], [101.081229277344, 24.4999587226563], [101.067345, 24.483843], [101.041217070313, 24.5047658515625], [101.043011503906, 24.5192018867188], [101.031678496094, 24.5384841132813], [101.034093046875, 24.5579006171875], [100.994400664063, 24.6075319648438], [100.951939726563, 24.67743675], [100.942874785156, 24.7295314765626], [100.920985136719, 24.7268093085938], [100.907345, 24.743843], [100.920152617188, 24.748843], [100.907345, 24.753843], [100.925133085938, 24.7760549140625], [100.953587675781, 24.7988430000001], [100.941790800781, 24.8082888007813], [100.932159453125, 24.8419802070313], [100.911790800781, 24.8582888007813], [100.900394316406, 24.8981545234375], [100.902967558594, 24.9188430000001], [100.89861453125, 24.9538430000001], [100.908678007813, 25.0347658515625], [100.881441679688, 25.056577375], [100.88318484375, 25.0706032539063], [100.911890898438, 25.0670339179688], [100.930079375, 25.0897463203125], [100.970079375, 25.084770734375], [100.981890898438, 25.0995217109375], [100.992345, 25.0982204414063], [101.01095828125, 25.1005373359375], [101.031790800781, 25.0882888007813], [101.062899199219, 25.0793971992188], [101.081790800781, 25.0682888007813], [101.112899199219, 25.0593971992188], [101.149263945313, 25.0380178046875], [101.161790800781, 25.0082888007812], [101.200184355469, 24.9429763007813], [101.284874296875, 24.95351096875], [101.280311308594, 24.9902028632813], [101.303023710938, 25.0083888984375], [101.300650664063, 25.02745628125], [101.312899199219, 25.0482888007813], [101.323057890625, 25.0724025703125], [101.342899199219, 25.0882888007813], [101.35470828125, 25.1163161445313], [101.34146609375, 25.138843], [101.364344511719, 25.1777638984376], [101.360689726563, 25.2071486640625], [101.337345, 25.243843], [101.352154570313, 25.2490334296876], [101.382535429688, 25.2586525703125], [101.402298613281, 25.3094020820313]]]] } }, { "type": "Feature", "properties": { "name": "大姚县", "id": "532326" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.617345, 25.663843], [101.621397734375, 25.6868410468751], [101.630042753906, 25.6692775703125], [101.617345, 25.663843]]], [[[101.617345, 25.663843], [101.622061796875, 25.64546409375], [101.667345, 25.633843], [101.663260527344, 25.6279274726563], [101.635408964844, 25.6175051093751], [101.631224394531, 25.5988430000001], [101.635306425781, 25.5806276679688], [101.622345, 25.5777223945313], [101.611571074219, 25.5801369453125], [101.603118925781, 25.5575490546875], [101.592303496094, 25.5599733710938], [101.567345, 25.553843], [101.563170195313, 25.5596681953125], [101.554749785156, 25.6022829414063], [101.524285917969, 25.5962624335938], [101.503170195313, 25.6096681953126], [101.469007597656, 25.6180178046875], [101.401815214844, 25.5976052070313], [101.393170195313, 25.6096681953126], [101.377503691406, 25.6180178046875], [101.358197050781, 25.5910817695313], [101.307345, 25.6233669257813], [101.282269316406, 25.6074465156251], [101.253170195313, 25.6296681953125], [101.213660917969, 25.6400905585937], [101.182345, 25.6339040351563], [101.168487578125, 25.7030202460938], [101.114774199219, 25.6924074531251], [101.089400664063, 25.7361721015626], [101.04091921875, 25.6961598945313], [101.016571074219, 25.7009719062501], [100.993870878906, 25.7326442695313], [100.957345, 25.723843], [100.969976835938, 25.7539162421875], [100.938538847656, 25.7468679023438], [100.943565703125, 25.7692897773438], [100.924000273438, 25.7993361640625], [100.891429472656, 25.8179274726563], [100.887345, 25.823843], [100.892806425781, 25.8283815742188], [100.901883574219, 25.8393044257813], [100.923992949219, 25.857671125], [100.921636992188, 25.8807936835938], [100.942806425781, 25.8983815742188], [100.956339140625, 25.9146681953126], [100.951014433594, 25.9668971992188], [100.909810820313, 25.9789870429688], [100.91318484375, 26.0120803046875], [100.932806425781, 26.0283815742188], [100.941883574219, 26.0453688789063], [100.910816679688, 26.0588430000001], [100.92041140625, 26.1529885078125], [100.907345, 26.163843], [100.93377078125, 26.2133669257813], [100.976666289063, 26.2464748359375], [101.01298953125, 26.2681984687501], [101.06170046875, 26.3094875312501], [101.093631621094, 26.3225563789063], [101.12170046875, 26.33948753125], [101.175614042969, 26.3486452460938], [101.187345, 26.3638430000001], [101.221185332031, 26.356001203125], [101.33951296875, 26.3761037421875], [101.376143828125, 26.39819846875], [101.41298953125, 26.3894875312501], [101.417345, 26.383843], [101.402064238281, 26.3791237617188], [101.385094023438, 26.3601296210937], [101.3520325, 26.3391042304688], [101.352652617188, 26.3286647773438], [101.342037382813, 26.2890212226563], [101.3426575, 26.2786061835938], [101.321715117188, 26.2486257148438], [101.391663847656, 26.235571515625], [101.356475859375, 26.2041335273438], [101.37490359375, 26.152778546875], [101.352064238281, 26.0891237617188], [101.342625761719, 26.0585622382813], [101.319852324219, 26.0481081367188], [101.332254667969, 26.0079445625001], [101.361795683594, 26.0097048164062], [101.392894316406, 25.9879811835938], [101.421995878906, 25.9897170234375], [101.424132109375, 25.953843], [101.420948515625, 25.90042503125], [101.462479277344, 25.8682399726563], [101.476395292969, 25.8985622382813], [101.502625761719, 25.8891237617188], [101.551043730469, 25.8516017890626], [101.602064238281, 25.8485622382813], [101.607345, 25.843843], [101.61170046875, 25.8381984687501], [101.653160429688, 25.8093679023438], [101.651575957031, 25.7986330390625], [101.665335722656, 25.7514382148438], [101.605775175781, 25.7270607734375], [101.600867949219, 25.693843], [101.603084746094, 25.6788430000001], [101.601517363281, 25.6682497382813], [101.617345, 25.663843]]]] } }, { "type": "Feature", "properties": { "name": "禄丰县", "id": "532331" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[102.387345, 25.383843], [102.377345, 25.383843], [102.377345, 25.393843], [102.387345, 25.393843], [102.387345, 25.383843]]], [[[102.363160429688, 25.3393556953126], [102.36021609375, 25.3194411445313], [102.372542753906, 25.2751784492188], [102.408409453125, 25.2804787421875], [102.413133574219, 25.2485158515625], [102.397345, 25.213843], [102.374469023438, 25.1997487617188], [102.363531523438, 25.1676564765626], [102.3505090625, 25.1491042304688], [102.36406375, 25.118843], [102.357345, 25.1038430000001], [102.342186308594, 25.0681325507813], [102.302252226563, 25.0689479804688], [102.2368371875, 25.0292775703125], [102.222445097656, 25.0589430976563], [102.202244902344, 25.0687429023438], [102.186002226563, 25.085649640625], [102.170377226563, 25.0553176093751], [102.188890410156, 24.9982619453126], [102.222440214844, 24.9989479804688], [102.232244902344, 24.9887429023438], [102.246163359375, 24.9753713203125], [102.218729277344, 24.9221193671876], [102.227345, 24.9138430000001], [102.219893828125, 24.9045363593751], [102.171790800781, 24.9182888007813], [102.123858671875, 24.956626203125], [102.112899199219, 24.9182888007813], [102.081217070313, 24.8929201484376], [102.083802519531, 24.872134015625], [102.047332792969, 24.8675978828125], [101.997345, 24.8738430000001], [101.98318484375, 24.8968263984376], [101.950572539063, 24.9076564765625], [101.91287234375, 24.8771218085938], [101.892345, 24.8835158515626], [101.872345, 24.8772853828126], [101.861385527344, 24.88069846875], [101.853531523438, 24.8576564765626], [101.825855742188, 24.8500295234375], [101.817345, 24.863843], [101.799515410156, 24.908110578125], [101.75170046875, 24.91819846875], [101.74298953125, 24.9259206367188], [101.810545683594, 24.9535695625], [101.789144316406, 25.026968], [101.742594023438, 25.046020734375], [101.73298953125, 25.06948753125], [101.72170046875, 25.0781984687501], [101.709871855469, 25.10710471875], [101.713148222656, 25.1292726875], [101.684823027344, 25.1674758125], [101.647345, 25.173843], [101.654725371094, 25.191801984375], [101.645877714844, 25.2365773750001], [101.662345, 25.2398317695313], [101.701519804688, 25.2320900703125], [101.693170195313, 25.2596681953125], [101.681234160156, 25.2682228828126], [101.685911894531, 25.291889875], [101.673170195313, 25.3096681953126], [101.636881132813, 25.3192409492187], [101.653785429688, 25.342827375], [101.705933867188, 25.3629421210938], [101.687095976563, 25.4087819648438], [101.742532988281, 25.4198952460938], [101.791981230469, 25.4576564765625], [101.832469511719, 25.4699562812501], [101.847345, 25.463843], [101.852882109375, 25.4491091132813], [101.85107546875, 25.4313893867188], [101.862103300781, 25.4181154609375], [101.898001738281, 25.4316042304687], [101.912806425781, 25.4193044257813], [101.922735625, 25.4073537421875], [101.944295683594, 25.4095510078125], [101.977728300781, 25.3693044257813], [102.015582304688, 25.3920851875], [102.0107825, 25.439165265625], [102.047345, 25.4438430000001], [102.051803007813, 25.40151878125], [102.091158476563, 25.3676564765625], [102.113531523438, 25.3600295234376], [102.150572539063, 25.3300295234375], [102.197120390625, 25.3549221015625], [102.176812773438, 25.383843], [102.193531523438, 25.4076564765625], [102.207554960938, 25.4488039375001], [102.233531523438, 25.4576564765625], [102.242906523438, 25.4974611640625], [102.271385527344, 25.5063307929688], [102.281158476563, 25.4776564765625], [102.307135039063, 25.4688039375], [102.325159941406, 25.4159084296875], [102.351158476563, 25.3976564765625], [102.367345, 25.393843], [102.349937773438, 25.3495607734375], [102.363160429688, 25.3393556953126]]]] } }, { "type": "Feature", "properties": { "name": "牟定县", "id": "532323" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.79170046875, 25.5781984687501], [101.82298953125, 25.56948753125], [101.83170046875, 25.50819846875], [101.853319121094, 25.4790407539063], [101.847345, 25.463843], [101.832469511719, 25.4699562812501], [101.791981230469, 25.4576564765625], [101.742532988281, 25.4198952460938], [101.687095976563, 25.4087819648438], [101.705933867188, 25.3629421210938], [101.653785429688, 25.342827375], [101.636881132813, 25.3192409492187], [101.673170195313, 25.3096681953126], [101.685911894531, 25.291889875], [101.681234160156, 25.2682228828126], [101.693170195313, 25.2596681953125], [101.701519804688, 25.2320900703125], [101.662345, 25.2398317695313], [101.645877714844, 25.2365773750001], [101.654725371094, 25.191801984375], [101.647345, 25.173843], [101.576676054688, 25.1490724921875], [101.562535429688, 25.1790334296876], [101.531964140625, 25.1934621406251], [101.502535429688, 25.2090334296875], [101.478309355469, 25.2204665351563], [101.422489042969, 25.2182546210938], [101.412535429688, 25.2301222968751], [101.442579375, 25.2579567695313], [101.441727324219, 25.2794142890626], [101.422164335938, 25.278637921875], [101.402298613281, 25.3094020820313], [101.382535429688, 25.2586525703125], [101.352154570313, 25.2490334296876], [101.337345, 25.243843], [101.331790800781, 25.2482888007813], [101.322899199219, 25.2742653632813], [101.351334257813, 25.3226418281251], [101.32088015625, 25.34702659375], [101.327345, 25.363843], [101.362064238281, 25.3703224921875], [101.332625761719, 25.3891237617188], [101.302625761719, 25.4028932929688], [101.3137903125, 25.4339260078125], [101.357806425781, 25.4100075507813], [101.409598417969, 25.4069216132813], [101.4226575, 25.4185890937501], [101.421654082031, 25.4354177070313], [101.434976835938, 25.4785622382813], [101.456705351563, 25.4669435859375], [101.487345, 25.43265159375], [101.502064238281, 25.4491237617187], [101.520147734375, 25.4652834296876], [101.493121367188, 25.5150197578125], [101.522625761719, 25.5285622382813], [101.552064238281, 25.5491237617188], [101.567345, 25.553843], [101.592303496094, 25.5599733710938], [101.603118925781, 25.5575490546875], [101.611571074219, 25.5801369453125], [101.622345, 25.5777223945313], [101.635306425781, 25.5806276679688], [101.631224394531, 25.5988430000001], [101.635408964844, 25.6175051093751], [101.663260527344, 25.6279274726563], [101.667345, 25.633843], [101.708531523438, 25.6645851875], [101.753436308594, 25.6712209296876], [101.751529570313, 25.6583303046875], [101.76298953125, 25.64948753125], [101.772889433594, 25.6025710273438], [101.79170046875, 25.5781984687501]]]] } }, { "type": "Feature", "properties": { "name": "南华县", "id": "532324" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[100.907345, 24.753843], [100.920152617188, 24.748843], [100.907345, 24.743843], [100.907345, 24.753843]]], [[[101.077345, 25.3338430000001], [101.080767851563, 25.3460353828125], [101.089537382813, 25.3372658515625], [101.077345, 25.3338430000001]]], [[[100.907345, 24.753843], [100.872777128906, 24.7280397773438], [100.837345, 24.7332765937501], [100.801954375, 24.7280471015625], [100.772735625, 24.7456716132813], [100.76298953125, 24.76948753125], [100.75170046875, 24.7781984687501], [100.747345, 24.783843], [100.741976347656, 24.8089650703126], [100.752779570313, 24.828843], [100.733758574219, 24.863843], [100.752625761719, 24.8985622382813], [100.762064238281, 24.9206911445313], [100.742064238281, 24.9385622382812], [100.722625761719, 24.9847927070313], [100.781829863281, 25.0119655585938], [100.74615359375, 25.043843], [100.764908476563, 25.0606008125], [100.752037382813, 25.1086647773438], [100.753238554688, 25.128843], [100.7520325, 25.1490676093751], [100.762625761719, 25.1685622382812], [100.777345, 25.203843], [100.820169707031, 25.1973293281251], [100.822940703125, 25.243843], [100.820970488281, 25.2768947578125], [100.92468875, 25.2396779609376], [100.94259890625, 25.2597219062501], [100.989246855469, 25.2569411445313], [100.97095828125, 25.2905934882813], [100.972642851563, 25.318843], [100.97181765625, 25.3326882148438], [101.002120390625, 25.3491555], [101.012467070313, 25.3485378242188], [101.047345, 25.353843], [101.055201445313, 25.3383132148438], [101.077345, 25.3338430000001], [101.085638457031, 25.306294171875], [101.122345, 25.3092458320313], [101.132699003906, 25.3084133125001], [101.144754667969, 25.3484548164063], [101.173504667969, 25.3150881171875], [101.212537871094, 25.3294216132813], [101.232166777344, 25.3066408515626], [101.247401152344, 25.3572414375001], [101.277345, 25.3596462226563], [101.29982546875, 25.3578395820313], [101.327345, 25.363843], [101.32088015625, 25.34702659375], [101.351334257813, 25.3226418281251], [101.322899199219, 25.2742653632813], [101.331790800781, 25.2482888007813], [101.337345, 25.243843], [101.360689726563, 25.2071486640625], [101.364344511719, 25.1777638984376], [101.34146609375, 25.138843], [101.35470828125, 25.1163161445313], [101.342899199219, 25.0882888007813], [101.323057890625, 25.0724025703125], [101.312899199219, 25.0482888007813], [101.300650664063, 25.02745628125], [101.303023710938, 25.0083888984375], [101.280311308594, 24.9902028632813], [101.284874296875, 24.95351096875], [101.200184355469, 24.9429763007813], [101.161790800781, 25.0082888007812], [101.149263945313, 25.0380178046875], [101.112899199219, 25.0593971992188], [101.081790800781, 25.0682888007813], [101.062899199219, 25.0793971992188], [101.031790800781, 25.0882888007813], [101.01095828125, 25.1005373359375], [100.992345, 25.0982204414063], [100.981890898438, 25.0995217109375], [100.970079375, 25.084770734375], [100.930079375, 25.0897463203125], [100.911890898438, 25.0670339179688], [100.88318484375, 25.0706032539063], [100.881441679688, 25.056577375], [100.908678007813, 25.0347658515625], [100.89861453125, 24.9538430000001], [100.902967558594, 24.9188430000001], [100.900394316406, 24.8981545234375], [100.911790800781, 24.8582888007813], [100.932159453125, 24.8419802070313], [100.941790800781, 24.8082888007813], [100.953587675781, 24.7988430000001], [100.925133085938, 24.7760549140625], [100.907345, 24.753843]]]] } }, { "type": "Feature", "properties": { "name": "双柏县", "id": "532322" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.817345, 24.253843], [101.813922148438, 24.2416506171875], [101.805152617188, 24.2504201484376], [101.817345, 24.253843]]], [[[101.997345, 24.4638430000001], [101.997345, 24.473843], [102.007345, 24.473843], [102.007345, 24.4638430000001], [101.997345, 24.4638430000001]]], [[[101.937345, 24.623843], [101.925152617188, 24.6204201484375], [101.933922148438, 24.6116506171875], [101.951429472656, 24.6141188789063], [101.938951445313, 24.5893874335938], [101.898331328125, 24.5789626289063], [101.916478300781, 24.5082497382813], [101.943260527344, 24.4897585273438], [101.958070097656, 24.4683083320313], [101.997345, 24.4638430000001], [102.00170046875, 24.44819846875], [102.013377714844, 24.428843], [102.001077910156, 24.4084548164063], [102.03170046875, 24.3959206367188], [102.02298953125, 24.36819846875], [102.01170046875, 24.34948753125], [101.999840117188, 24.2932814765626], [101.94170046875, 24.26948753125], [101.932857695313, 24.2580275703125], [101.913812285156, 24.2608425117188], [101.887345, 24.243843], [101.882345, 24.2566506171875], [101.877345, 24.243843], [101.862359648438, 24.2512917304688], [101.842242460938, 24.2414675117188], [101.817345, 24.253843], [101.812625761719, 24.2591237617188], [101.8020325, 24.26858909375], [101.802760039063, 24.2808107734376], [101.822940703125, 24.298843], [101.805631132813, 24.3143093085937], [101.781812773438, 24.28765159375], [101.754432402344, 24.318296125], [101.714661894531, 24.3365480781251], [101.660477324219, 24.378540265625], [101.639251738281, 24.3547853828125], [101.622625761719, 24.3185622382813], [101.592064238281, 24.2791237617188], [101.579002714844, 24.2506667304688], [101.527530546875, 24.2270436835938], [101.487979765625, 24.2294020820313], [101.454752226563, 24.3370119453126], [101.441217070313, 24.395180890625], [101.410257597656, 24.409389875], [101.392345, 24.429438703125], [101.380980253906, 24.4167214179688], [101.383194609375, 24.37960471875], [101.369686308594, 24.354751203125], [101.284010039063, 24.3154274726563], [101.277345, 24.293843], [101.263985625, 24.300483625], [101.247345, 24.3038430000001], [101.207991972656, 24.3330373359375], [101.171790800781, 24.3482888007813], [101.162899199219, 24.3693971992188], [101.122928496094, 24.4193703437501], [101.096502714844, 24.4405324531251], [101.072899199219, 24.4793971992188], [101.067345, 24.483843], [101.081229277344, 24.4999587226563], [101.10271609375, 24.5184719062501], [101.145794707031, 24.56847190625], [101.19271609375, 24.5592140937501], [101.232042265625, 24.5284157539063], [101.252345, 24.5300490546876], [101.266102324219, 24.49921409375], [101.30271609375, 24.5184719062501], [101.31197390625, 24.53921409375], [101.32271609375, 24.54847190625], [101.332401152344, 24.570171125], [101.43271609375, 24.5884719062501], [101.46197390625, 24.60921409375], [101.49197390625, 24.6226003242188], [101.48271609375, 24.6292140937501], [101.4519153125, 24.6384889960938], [101.452772246094, 24.6491677070313], [101.432977324219, 24.6662209296875], [101.42271609375, 24.68921409375], [101.400731230469, 24.6990261054688], [101.464364042969, 24.7087209296875], [101.4619153125, 24.7392018867188], [101.50297, 24.7485280585938], [101.485738554688, 24.7954494453125], [101.539412871094, 24.7757399726562], [101.607784453125, 24.8322927070313], [101.662323027344, 24.7982521796876], [101.689229765625, 24.8132643867187], [101.706302519531, 24.7934474921875], [101.75197390625, 24.82921409375], [101.794437285156, 24.83886253125], [101.81197390625, 24.8592140937501], [101.817345, 24.863843], [101.825855742188, 24.8500295234375], [101.853531523438, 24.8576564765626], [101.861385527344, 24.88069846875], [101.872345, 24.8772853828126], [101.892345, 24.8835158515626], [101.91287234375, 24.8771218085938], [101.950572539063, 24.9076564765625], [101.98318484375, 24.8968263984376], [101.997345, 24.8738430000001], [102.005072050781, 24.8268093085938], [101.978631621094, 24.7925563789062], [101.937847929688, 24.7610744453125], [101.931529570313, 24.7183303046876], [101.943160429688, 24.7093556953125], [101.941605253906, 24.698843], [101.945091582031, 24.675259015625], [101.89298953125, 24.635044171875], [101.912706328125, 24.6278322578126], [101.923485136719, 24.6417995429688], [101.937345, 24.623843]]]] } }, { "type": "Feature", "properties": { "name": "武定县", "id": "532329" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[102.335286894531, 25.9372463203125], [102.320545683594, 25.8845217109375], [102.331883574219, 25.8583815742188], [102.371600371094, 25.8411550117187], [102.373363066406, 25.823843], [102.371834746094, 25.808843], [102.373834257813, 25.7892336250001], [102.35541140625, 25.773930890625], [102.350907011719, 25.7297365546875], [102.376461210938, 25.6942287421876], [102.370167265625, 25.6324831367188], [102.381883574219, 25.6183815742188], [102.392806425781, 25.6093044257813], [102.406346464844, 25.5930055976563], [102.432022734375, 25.5783010078125], [102.454046660156, 25.5805446601563], [102.449583769531, 25.5367409492188], [102.461883574219, 25.5083815742188], [102.481663847656, 25.473843], [102.461883574219, 25.4393044257813], [102.457345, 25.423843], [102.449539824219, 25.4116481757812], [102.430726347656, 25.39960471875], [102.435885039063, 25.3812429023438], [102.396156035156, 25.3700783515625], [102.387345, 25.383843], [102.387345, 25.393843], [102.377345, 25.393843], [102.367345, 25.393843], [102.351158476563, 25.3976564765625], [102.325159941406, 25.4159084296875], [102.307135039063, 25.4688039375], [102.281158476563, 25.4776564765625], [102.271385527344, 25.5063307929688], [102.242906523438, 25.4974611640625], [102.233531523438, 25.4576564765625], [102.207554960938, 25.4488039375001], [102.193531523438, 25.4076564765625], [102.176812773438, 25.383843], [102.197120390625, 25.3549221015625], [102.150572539063, 25.3300295234375], [102.113531523438, 25.3600295234376], [102.091158476563, 25.3676564765625], [102.051803007813, 25.40151878125], [102.047345, 25.4438430000001], [102.031429472656, 25.4679274726563], [102.023260527344, 25.4897585273438], [102.007191191406, 25.50085471875], [102.017037382813, 25.5447756171875], [102.007069121094, 25.5579274726563], [101.993016386719, 25.5375710273438], [101.96252078125, 25.5444069648438], [101.953260527344, 25.5742433906251], [101.999490996094, 25.5638771796875], [102.011429472656, 25.5767018867188], [101.969757109375, 25.5922951484375], [101.973616972656, 25.6095143867188], [101.947862578125, 25.6272951484375], [101.964586210938, 25.6388430000001], [101.950103789063, 25.648843], [101.963260527344, 25.6579274726563], [101.975513945313, 25.6756740546875], [102.004217558594, 25.6954909492188], [102.001073027344, 25.7095143867187], [102.015557890625, 25.7195143867188], [102.00978640625, 25.7452516914063], [101.991429472656, 25.7579274726563], [101.983260527344, 25.7697585273437], [101.962991972656, 25.7837526679688], [101.946043730469, 25.8290431953126], [101.904827910156, 25.8396218085938], [101.927594023438, 25.8745827460938], [101.988297148438, 25.8972951484375], [101.981073027344, 25.9295143867188], [102.005067167969, 25.9460793281251], [102.054666777344, 25.9349587226563], [102.071429472656, 25.9797585273438], [102.092713652344, 25.9944533515626], [102.101429472656, 26.0497585273438], [102.107345, 26.073843], [102.123682890625, 26.097505109375], [102.153260527344, 26.1179274726563], [102.171429472656, 26.1497585273437], [102.237345, 26.183843], [102.267899199219, 26.127231671875], [102.321883574219, 26.0883815742188], [102.351883574219, 26.0753688789063], [102.342806425781, 26.0383815742188], [102.331807890625, 26.0091091132813], [102.333753691406, 25.9900319648438], [102.321803007813, 25.969165265625], [102.322855253906, 25.958843], [102.321795683594, 25.9484523750001], [102.335286894531, 25.9372463203125]]]] } }, { "type": "Feature", "properties": { "name": "姚安县", "id": "532325" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.077345, 25.3338430000001], [101.089537382813, 25.3372658515625], [101.080767851563, 25.3460353828125], [101.055201445313, 25.3383132148438], [101.047345, 25.353843], [101.043170195313, 25.3596681953125], [101.027772246094, 25.3707033515626], [101.035003691406, 25.4072951484375], [100.978211699219, 25.4186818671875], [100.963170195313, 25.4396681953125], [100.951234160156, 25.4482228828125], [100.95341921875, 25.4592751289063], [100.941180449219, 25.4785524726563], [100.953367949219, 25.51866721875], [100.948778105469, 25.5418898750001], [100.961519804688, 25.5596681953125], [101.000992460938, 25.5700807929688], [100.991356230469, 25.618843], [100.993917265625, 25.631801984375], [100.983170195313, 25.6596681953125], [100.961519804688, 25.6680178046876], [100.953170195313, 25.6796681953125], [100.933170195313, 25.6940016914063], [100.943963652344, 25.7142507148438], [100.957345, 25.723843], [100.993870878906, 25.7326442695313], [101.016571074219, 25.7009719062501], [101.04091921875, 25.6961598945313], [101.089400664063, 25.7361721015626], [101.114774199219, 25.6924074531251], [101.168487578125, 25.7030202460938], [101.182345, 25.6339040351563], [101.213660917969, 25.6400905585937], [101.253170195313, 25.6296681953125], [101.282269316406, 25.6074465156251], [101.307345, 25.6233669257813], [101.358197050781, 25.5910817695313], [101.377503691406, 25.6180178046875], [101.393170195313, 25.6096681953126], [101.401815214844, 25.5976052070313], [101.469007597656, 25.6180178046875], [101.503170195313, 25.6096681953126], [101.524285917969, 25.5962624335938], [101.554749785156, 25.6022829414063], [101.563170195313, 25.5596681953125], [101.567345, 25.553843], [101.552064238281, 25.5491237617188], [101.522625761719, 25.5285622382813], [101.493121367188, 25.5150197578125], [101.520147734375, 25.4652834296876], [101.502064238281, 25.4491237617187], [101.487345, 25.43265159375], [101.456705351563, 25.4669435859375], [101.434976835938, 25.4785622382813], [101.421654082031, 25.4354177070313], [101.4226575, 25.4185890937501], [101.409598417969, 25.4069216132813], [101.357806425781, 25.4100075507813], [101.3137903125, 25.4339260078125], [101.302625761719, 25.4028932929688], [101.332625761719, 25.3891237617188], [101.362064238281, 25.3703224921875], [101.327345, 25.363843], [101.29982546875, 25.3578395820313], [101.277345, 25.3596462226563], [101.247401152344, 25.3572414375001], [101.232166777344, 25.3066408515626], [101.212537871094, 25.3294216132813], [101.173504667969, 25.3150881171875], [101.144754667969, 25.3484548164063], [101.132699003906, 25.3084133125001], [101.122345, 25.3092458320313], [101.085638457031, 25.306294171875], [101.077345, 25.3338430000001]]]] } }, { "type": "Feature", "properties": { "name": "永仁县", "id": "532327" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.647345, 26.313843], [101.659537382813, 26.3104201484376], [101.650767851563, 26.3016506171875], [101.647345, 26.313843]]], [[[101.647345, 26.313843], [101.615426054688, 26.3208058906251], [101.592955351563, 26.3014455390625], [101.591324492188, 26.2811525703125], [101.629635039063, 26.227798078125], [101.691016875, 26.24118675], [101.70197390625, 26.2284719062501], [101.735736113281, 26.218305890625], [101.802877226563, 26.1604616523438], [101.799215117188, 26.114887921875], [101.82197390625, 26.08847190625], [101.837345, 26.083843], [101.831043730469, 26.0581935859375], [101.837345, 26.0538430000001], [101.832862578125, 26.0377419257813], [101.793717070313, 26.0531325507812], [101.790867949219, 26.033843], [101.795262480469, 26.0040993476563], [101.782857695313, 25.9880275703125], [101.753258085938, 25.9924025703125], [101.721522246094, 25.9794142890625], [101.72373171875, 25.9644509101563], [101.71298953125, 25.93819846875], [101.698138457031, 25.9267360664063], [101.680362578125, 25.8972658515625], [101.684407988281, 25.8698854804688], [101.672345, 25.8681032539063], [101.661209746094, 25.8697487617188], [101.61170046875, 25.84948753125], [101.607345, 25.843843], [101.602064238281, 25.8485622382813], [101.551043730469, 25.8516017890626], [101.502625761719, 25.8891237617188], [101.476395292969, 25.8985622382813], [101.462479277344, 25.8682399726563], [101.420948515625, 25.90042503125], [101.424132109375, 25.953843], [101.421995878906, 25.9897170234375], [101.392894316406, 25.9879811835938], [101.361795683594, 26.0097048164062], [101.332254667969, 26.0079445625001], [101.319852324219, 26.0481081367188], [101.342625761719, 26.0585622382813], [101.352064238281, 26.0891237617188], [101.37490359375, 26.152778546875], [101.356475859375, 26.2041335273438], [101.391663847656, 26.235571515625], [101.321715117188, 26.2486257148438], [101.3426575, 26.2786061835938], [101.342037382813, 26.2890212226563], [101.352652617188, 26.3286647773438], [101.3520325, 26.3391042304688], [101.385094023438, 26.3601296210937], [101.402064238281, 26.3791237617188], [101.417345, 26.383843], [101.428270292969, 26.3929177070313], [101.441883574219, 26.4093044257813], [101.481422148438, 26.4421486640626], [101.451517363281, 26.4669899726563], [101.457345, 26.503843], [101.502899199219, 26.4993971992188], [101.531790800781, 26.4782888007813], [101.562899199219, 26.4593971992188], [101.58267703125, 26.4346974921876], [101.634168730469, 26.3985036445313], [101.630535917969, 26.3692971015625], [101.66107546875, 26.34483909375], [101.64146609375, 26.32913596875], [101.647345, 26.313843]]]] } }, { "type": "Feature", "properties": { "name": "元谋县", "id": "532328" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[101.617345, 25.663843], [101.630042753906, 25.6692775703125], [101.621397734375, 25.6868410468751], [101.601517363281, 25.6682497382813], [101.603084746094, 25.6788430000001], [101.600867949219, 25.693843], [101.605775175781, 25.7270607734375], [101.665335722656, 25.7514382148438], [101.651575957031, 25.7986330390625], [101.653160429688, 25.8093679023438], [101.61170046875, 25.8381984687501], [101.607345, 25.843843], [101.61170046875, 25.84948753125], [101.661209746094, 25.8697487617188], [101.672345, 25.8681032539063], [101.684407988281, 25.8698854804688], [101.680362578125, 25.8972658515625], [101.698138457031, 25.9267360664063], [101.71298953125, 25.93819846875], [101.72373171875, 25.9644509101563], [101.721522246094, 25.9794142890625], [101.753258085938, 25.9924025703125], [101.782857695313, 25.9880275703125], [101.795262480469, 26.0040993476563], [101.790867949219, 26.033843], [101.793717070313, 26.0531325507812], [101.832862578125, 26.0377419257813], [101.837345, 26.0538430000001], [101.863260527344, 26.0579274726563], [101.895804472656, 26.106255109375], [101.912491484375, 26.1099977851562], [101.977379179688, 26.0898830390625], [102.022796660156, 26.1000661445313], [102.071893339844, 26.0676198554688], [102.082345, 26.0699636054688], [102.092623320313, 26.0676589179688], [102.107345, 26.073843], [102.101429472656, 26.0497585273438], [102.092713652344, 25.9944533515626], [102.071429472656, 25.9797585273438], [102.054666777344, 25.9349587226563], [102.005067167969, 25.9460793281251], [101.981073027344, 25.9295143867188], [101.988297148438, 25.8972951484375], [101.927594023438, 25.8745827460938], [101.904827910156, 25.8396218085938], [101.946043730469, 25.8290431953126], [101.962991972656, 25.7837526679688], [101.983260527344, 25.7697585273437], [101.991429472656, 25.7579274726563], [102.00978640625, 25.7452516914063], [102.015557890625, 25.7195143867188], [102.001073027344, 25.7095143867187], [102.004217558594, 25.6954909492188], [101.975513945313, 25.6756740546875], [101.963260527344, 25.6579274726563], [101.950103789063, 25.648843], [101.964586210938, 25.6388430000001], [101.947862578125, 25.6272951484375], [101.973616972656, 25.6095143867188], [101.969757109375, 25.5922951484375], [102.011429472656, 25.5767018867188], [101.999490996094, 25.5638771796875], [101.953260527344, 25.5742433906251], [101.96252078125, 25.5444069648438], [101.993016386719, 25.5375710273438], [102.007069121094, 25.5579274726563], [102.017037382813, 25.5447756171875], [102.007191191406, 25.50085471875], [102.023260527344, 25.4897585273438], [102.031429472656, 25.4679274726563], [102.047345, 25.4438430000001], [102.0107825, 25.439165265625], [102.015582304688, 25.3920851875], [101.977728300781, 25.3693044257813], [101.944295683594, 25.4095510078125], [101.922735625, 25.4073537421875], [101.912806425781, 25.4193044257813], [101.898001738281, 25.4316042304687], [101.862103300781, 25.4181154609375], [101.85107546875, 25.4313893867188], [101.852882109375, 25.4491091132813], [101.847345, 25.463843], [101.853319121094, 25.4790407539063], [101.83170046875, 25.50819846875], [101.82298953125, 25.56948753125], [101.79170046875, 25.5781984687501], [101.772889433594, 25.6025710273438], [101.76298953125, 25.64948753125], [101.751529570313, 25.6583303046875], [101.753436308594, 25.6712209296876], [101.708531523438, 25.6645851875], [101.667345, 25.633843], [101.622061796875, 25.64546409375], [101.617345, 25.663843]]]] } }] });
}));