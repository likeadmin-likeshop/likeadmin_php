package com.alipay.easysdk.kms.aliyun;

import com.alipay.easysdk.kms.aliyun.credentials.AccessKeyCredentials;
import com.alipay.easysdk.kms.aliyun.credentials.BasicSessionCredentials;
import com.alipay.easysdk.kms.aliyun.credentials.ICredentials;
import com.alipay.easysdk.kms.aliyun.credentials.provider.CredentialsProviderFactory;
import com.alipay.easysdk.kms.aliyun.credentials.provider.EcsRamRoleCredentialsProvider;
import com.alipay.easysdk.kms.aliyun.credentials.provider.ICredentialsProvider;
import com.alipay.easysdk.kms.aliyun.credentials.provider.RamRoleArnCredentialsProvider;
import com.alipay.easysdk.kms.aliyun.credentials.provider.StaticCredentialsProvider;
import com.alipay.easysdk.kms.aliyun.credentials.utils.CredentialType;
import com.alipay.easysdk.kms.aliyun.models.RuntimeOptions;
import com.aliyun.tea.Tea;
import com.aliyun.tea.TeaConverter;
import com.aliyun.tea.TeaException;
import com.aliyun.tea.TeaModel;
import com.aliyun.tea.TeaPair;
import com.aliyun.tea.TeaRequest;
import com.aliyun.tea.TeaResponse;
import com.aliyun.tea.TeaRetryableException;
import com.aliyun.tea.TeaUnretryableException;
import com.aliyun.tea.ValidateException;
import com.aliyun.tea.utils.StringUtils;
import com.google.gson.Gson;
import org.bouncycastle.util.encoders.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.SimpleTimeZone;
import java.util.UUID;

public class AliyunRpcClient {
    private final String               accessKeyId;
    private final String               accessKeySecret;
    private final String               securityToken;
    private final String               roleArn;
    private final String               roleName;
    private final String               credentialType;
    private final String               policy;
    private final String               endpoint;
    private final String               format;
    private final String               signatureMethod;
    private final String               signatureVersion;
    private final ICredentialsProvider credentialsProvider;

    public AliyunRpcClient(Map<String, Object> config) {
        this.accessKeyId = (String) config.get("aliyunAccessKeyId");
        this.accessKeySecret = (String) config.get("aliyunAccessKeySecret");
        this.securityToken = (String) config.get("aliyunSecurityToken");
        this.roleArn = (String) config.get("aliyunRoleArn");
        this.roleName = (String) config.get("aliyunRoleName");
        this.credentialType = (String) config.get("credentialType");
        this.policy = (String) config.get("aliyunRolePolicy");
        this.endpoint = (String) config.get("kmsEndpoint");
        this.format = "json";
        this.signatureMethod = "HMAC-SHA1";
        this.signatureVersion = "1.0";
        this.credentialsProvider = getCredentialsProvider();
    }

    public static String percentEncode(String value) throws UnsupportedEncodingException {
        return value != null ? URLEncoder.encode(value, "UTF-8").replace("+", "%20")
                .replace("*", "%2A").replace("%7E", "~") : null;
    }

    private static String getSignature(Map<String, String> signedParams, String method, String secret) throws Exception {
        String[] sortedKeys = signedParams.keySet().toArray(new String[0]);
        Arrays.sort(sortedKeys);
        StringBuilder canonicalizedQueryString = new StringBuilder();

        for (String key : sortedKeys) {
            if (!StringUtils.isEmpty(signedParams.get(key))) {
                canonicalizedQueryString.append("&").append(percentEncode(key)).append("=").append(
                        percentEncode((String) signedParams.get(key)));
            }
        }

        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(new SecretKeySpec((secret + "&").getBytes(StandardCharsets.UTF_8), "HmacSHA1"));
        String stringToSign = method +
                "&" +
                percentEncode("/") +
                "&" +
                percentEncode(canonicalizedQueryString.toString().substring(1));
        byte[] signData = mac.doFinal(stringToSign.getBytes(StandardCharsets.UTF_8));
        return Base64.toBase64String(signData);
    }

    public static Object parseJSON(String json) {
        return (new Gson()).fromJson(json, Map.class);
    }

    public static Map<String, Object> assertAsMap(Object object) {
        if (null != object && Map.class.isAssignableFrom(object.getClass())) {
            return (Map) object;
        } else {
            throw new RuntimeException("The value is not a object");
        }
    }

    public static byte[] readAsBytes(InputStream stream) throws IOException {
        if (null == stream) {
            return new byte[0];
        } else {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            byte[] buff = new byte[1024];

            while (true) {
                int read = stream.read(buff);
                if (read == -1) {
                    return os.toByteArray();
                }

                os.write(buff, 0, read);
            }
        }
    }

    public static String readAsString(InputStream stream) throws IOException {
        return new String(readAsBytes(stream), StandardCharsets.UTF_8);
    }

    public static Object readAsJSON(InputStream stream) throws IOException {
        String body = readAsString(stream);
        return parseJSON(body);
    }

    public static String getTimestamp() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(new SimpleTimeZone(0, "UTC"));
        return df.format(new Date());
    }

    public static String getNonce() {
        StringBuilder uniqueNonce = new StringBuilder();
        UUID uuid = UUID.randomUUID();
        uniqueNonce.append(uuid.toString());
        uniqueNonce.append(System.currentTimeMillis());
        uniqueNonce.append(Thread.currentThread().getId());
        return uniqueNonce.toString();
    }

    public static String toFormString(Map<String, ?> map) throws UnsupportedEncodingException {
        if (null == map) {
            return "";
        }
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for (Map.Entry<String, ?> entry : map.entrySet()) {
            if (StringUtils.isEmpty(entry.getValue())) {
                continue;
            }
            if (first) {
                first = false;
            } else {
                result.append("&");
            }
            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(String.valueOf(entry.getValue()), "UTF-8"));
        }
        return result.toString();
    }

    public static void validateModel(TeaModel m) throws Exception {
        if (null == m) {
            throw new ValidateException("parameter is not allowed as null");
        } else {
            m.validate();
        }
    }

    public static Map<String, Object> anyifyMapValue(Map<String, ?> map) {
        Map<String, Object> result = new HashMap<>();
        if (null == map) {
            return null;
        }
        for (Map.Entry<String, ?> entry : map.entrySet()) {
            result.put(entry.getKey(), entry.getValue());
        }
        return result;
    }

    public static boolean is4xx(Number code) {
        if (null == code) {
            return false;
        } else {
            return code.intValue() >= 400 && code.intValue() < 500;
        }
    }

    public static boolean is5xx(Number code) {
        if (null == code) {
            return false;
        } else {
            return code.intValue() >= 500 && code.intValue() < 600;
        }
    }

    public static boolean isUnset(Object object) {
        return null == object;
    }

    private ICredentialsProvider getCredentialsProvider() {
        CredentialsProviderFactory factory = new CredentialsProviderFactory();
        if (StringUtils.isEmpty(this.credentialType)) {
            return getAccessKeyCredentialsProvider(this.accessKeyId, this.accessKeySecret, factory);
        }
        switch (this.credentialType) {
            case CredentialType.ACCESS_KEY:
                return getAccessKeyCredentialsProvider(this.accessKeyId, this.accessKeySecret, factory);
            case CredentialType.STS:
                return getStsTokenCredentialsProvider(this.accessKeyId, this.accessKeySecret, this.securityToken, factory);
            case CredentialType.ECS_RAM_ROLE:
                return getEcsRamRoleCredentialsProvider(this.roleName, factory);
            case CredentialType.RAM_ROLE_ARN:
                return getRamRoleArnCredentialsProvider(this.accessKeyId, this.accessKeySecret, this.roleArn, this.policy, factory);
        }
        throw new IllegalArgumentException("The credentialType is not supported");
    }

    private ICredentialsProvider getAccessKeyCredentialsProvider(String accessKeyId, String accessKeySecret,
                                                                 CredentialsProviderFactory factory) {
        return factory.createCredentialsProvider(new StaticCredentialsProvider(new AccessKeyCredentials(accessKeyId, accessKeySecret)));
    }

    private ICredentialsProvider getStsTokenCredentialsProvider(String accessKeyId, String accessKeySecret, String securityToken,
                                                                CredentialsProviderFactory factory) {
        return factory.createCredentialsProvider(new StaticCredentialsProvider(new BasicSessionCredentials(accessKeyId,
                accessKeySecret, securityToken)));
    }

    private ICredentialsProvider getEcsRamRoleCredentialsProvider(String roleName, CredentialsProviderFactory factory) {
        if (StringUtils.isEmpty(roleName)) {
            throw new IllegalArgumentException("The roleName is empty");
        }
        return factory.createCredentialsProvider(new EcsRamRoleCredentialsProvider(roleName));
    }

    private ICredentialsProvider getRamRoleArnCredentialsProvider(String accessKeyId, String accessKeySecret, String roleArn,
                                                                  String policy, CredentialsProviderFactory factory) {
        if (StringUtils.isEmpty(accessKeyId) || StringUtils.isEmpty(accessKeySecret)) {
            throw new IllegalArgumentException("The accessKeyId or accessKeySecret is empty");
        }
        if (StringUtils.isEmpty(roleArn)) {
            throw new IllegalArgumentException("The roleArn is empty");
        }
        return factory.createCredentialsProvider(new RamRoleArnCredentialsProvider(accessKeyId, accessKeySecret, roleArn, policy));
    }

    public Map<String, Object> doRequest(String action, String protocol, String method, String version, Map<String, Object> query,
                                         Map<String, Object> body, RuntimeOptions runtime) throws Exception {
        Map<String, Object> runtime_ = TeaConverter.buildMap(
                new TeaPair("readTimeout", runtime.readTimeout),
                new TeaPair("connectTimeout", runtime.connectTimeout),
                new TeaPair("retry", TeaConverter.buildMap(
                        new TeaPair("maxAttempts", runtime.maxAttempts)
                )),
                new TeaPair("backoff", TeaConverter.buildMap(
                        new TeaPair("policy", runtime.backoffPolicy),
                        new TeaPair("period", runtime.backoffPeriod)
                )),
                new TeaPair("ignoreSSL", runtime.ignoreSSL)
        );

        TeaRequest _lastRequest = null;
        long _now = System.currentTimeMillis();
        int _retryTimes = 0;
        while (Tea.allowRetry((java.util.Map<String, Object>) runtime_.get("retry"), _retryTimes, _now)) {
            if (_retryTimes > 0) {
                int backoffTime = Tea.getBackoffTime(runtime_.get("backoff"), _retryTimes);
                if (backoffTime > 0) {
                    Tea.sleep(backoffTime);
                }
            }
            _retryTimes = _retryTimes + 1;
            try {
                TeaRequest request_ = new TeaRequest();
                request_.protocol = protocol;
                request_.method = method;
                request_.pathname = "/";
                request_.query = TeaConverter.merge(String.class,
                        TeaConverter.buildMap(
                                new TeaPair("Action", action),
                                new TeaPair("Format", this.format),
                                new TeaPair("Timestamp", getTimestamp()),
                                new TeaPair("Version", version),
                                new TeaPair("SignatureNonce", getNonce())
                        ),
                        query
                );
                request_.headers = TeaConverter.buildMap(
                        new TeaPair("host", this.endpoint)
                );
                if (!isUnset(body)) {
                    java.util.Map<String, Object> tmp = anyifyMapValue(body);
                    request_.body = Tea.toReadable(toFormString(tmp));
                    request_.headers.put("content-type", "application/x-www-form-urlencoded");
                }

                ICredentials credentials = this.credentialsProvider.getCredentials();
                if (credentials == null) {
                    throw new TeaRetryableException();
                }

                request_.query.put("SignatureMethod", this.signatureMethod);
                request_.query.put("SignatureVersion", this.signatureVersion);
                request_.query.put("AccessKeyId", credentials.getAccessKeyId());
                if (!StringUtils.isEmpty(credentials.getSecurityToken())) {
                    request_.query.put("SecurityToken", credentials.getSecurityToken());
                }
                java.util.Map<String, String> signedParam = TeaConverter.merge(String.class,
                        request_.query,
                        body
                );
                request_.query.put("Signature", getSignature(signedParam, request_.method, credentials.getAccessKeySecret()));

                _lastRequest = request_;
                TeaResponse response_ = Tea.doAction(request_, runtime_);

                Object obj = readAsJSON(response_.body);
                java.util.Map<String, Object> res = assertAsMap(obj);
                if (is4xx(response_.statusCode) || is5xx(response_.statusCode)) {
                    throw new TeaException(TeaConverter.buildMap(
                            new TeaPair("message", res.get("Message")),
                            new TeaPair("data", res),
                            new TeaPair("code", res.get("Code"))
                    ));
                }

                return res;
            } catch (Exception e) {
                if (Tea.isRetryable(e)) {
                    continue;
                }
                throw e;
            }
        }

        throw new TeaUnretryableException(_lastRequest);
    }
}