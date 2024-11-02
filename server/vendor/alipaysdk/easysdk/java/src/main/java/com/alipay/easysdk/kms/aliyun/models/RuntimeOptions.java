package com.alipay.easysdk.kms.aliyun.models;

import com.aliyun.tea.NameInMap;
import com.aliyun.tea.TeaModel;

import java.util.Map;

public class RuntimeOptions extends TeaModel {
    @NameInMap("ignoreSSL")
    public Boolean ignoreSSL;
    @NameInMap("maxAttempts")
    public Integer maxAttempts;
    @NameInMap("backoffPolicy")
    public String backoffPolicy;
    @NameInMap("backoffPeriod")
    public Integer backoffPeriod;
    @NameInMap("readTimeout")
    public Integer readTimeout;
    @NameInMap("connectTimeout")
    public Integer connectTimeout;

    public static RuntimeOptions build(Map<String, ?> map) throws Exception {
        RuntimeOptions self = new RuntimeOptions();
        return TeaModel.build(map, self);
    }
}
