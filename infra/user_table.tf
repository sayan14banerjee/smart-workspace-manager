resource "aws_dynamodb_table" "users" {
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"

  attribute {
    name = "userId"
    type = "S"
  }
    attribute {
     name = "emailId"
     type = "S"
    }

   global_secondary_index {
    name            = "emailId-Index"
    hash_key        = "emailId"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }

  tags = {
    Project = "SmartWorkspaceManager"
    Env     = "dev"
  }
}
