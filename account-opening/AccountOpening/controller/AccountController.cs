using AccountOpening.model;
using Microsoft.AspNetCore.Mvc;

namespace AccountOpening.controller;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    [HttpPost]
    public ResponseModel CreateAccount(){
      return new ResponseModel {
        Message = "Account created successfully"
      };
    }

}