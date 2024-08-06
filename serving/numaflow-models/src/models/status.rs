/*
 * Numaflow
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: latest
 *
 * Generated by: https://openapi-generator.tech
 */

/// Status : Status is a common structure which can be used for Status field.

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Status {
    /// Conditions are the latest available observations of a resource's current state.
    #[serde(rename = "conditions", skip_serializing_if = "Option::is_none")]
    pub conditions: Option<Vec<k8s_openapi::apimachinery::pkg::apis::meta::v1::Condition>>,
}

impl Status {
    /// Status is a common structure which can be used for Status field.
    pub fn new() -> Status {
        Status { conditions: None }
    }
}
