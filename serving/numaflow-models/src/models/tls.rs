/*
 * Numaflow
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: latest
 *
 * Generated by: https://openapi-generator.tech
 */

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Tls {
    #[serde(rename = "caCertSecret", skip_serializing_if = "Option::is_none")]
    pub ca_cert_secret: Option<k8s_openapi::api::core::v1::SecretKeySelector>,
    #[serde(rename = "certSecret", skip_serializing_if = "Option::is_none")]
    pub cert_secret: Option<k8s_openapi::api::core::v1::SecretKeySelector>,
    #[serde(rename = "insecureSkipVerify", skip_serializing_if = "Option::is_none")]
    pub insecure_skip_verify: Option<bool>,
    #[serde(rename = "keySecret", skip_serializing_if = "Option::is_none")]
    pub key_secret: Option<k8s_openapi::api::core::v1::SecretKeySelector>,
}

impl Tls {
    pub fn new() -> Tls {
        Tls {
            ca_cert_secret: None,
            cert_secret: None,
            insecure_skip_verify: None,
            key_secret: None,
        }
    }
}
