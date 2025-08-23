resource "aws_dynamodb_table" "tasks" {
  name           = "Tasks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "taskId"

  attribute {
    name = "taskId"
    type = "S"
  }

   attribute {
    name = "workspaceId"
    type = "S"
  }

  global_secondary_index {
    name            = "WorkspaceId-Index"
    hash_key        = "workspaceId"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }

  tags = {
    Project = "SmartWorkspaceManager"
    Env     = "dev"
  }
}
