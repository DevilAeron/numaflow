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
pub struct Sink {
    #[serde(rename = "blackhole", skip_serializing_if = "Option::is_none")]
    pub blackhole: Option<Box<crate::models::Blackhole>>,
    #[serde(rename = "fallback", skip_serializing_if = "Option::is_none")]
    pub fallback: Option<Box<crate::models::AbstractSink>>,
    #[serde(rename = "kafka", skip_serializing_if = "Option::is_none")]
    pub kafka: Option<Box<crate::models::KafkaSink>>,
    #[serde(rename = "log", skip_serializing_if = "Option::is_none")]
    pub log: Option<Box<crate::models::Log>>,
    #[serde(rename = "udsink", skip_serializing_if = "Option::is_none")]
    pub udsink: Option<Box<crate::models::UdSink>>,
}

impl Sink {
    pub fn new() -> Sink {
        Sink {
            blackhole: None,
            fallback: None,
            kafka: None,
            log: None,
            udsink: None,
        }
    }
}
