using Lunchmate.DATA.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Lunchmate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggedInBaseController : ControllerBase
    {
        public LoggedInUser LoggedInUser
        {
            get
            {
                ClaimsIdentity claimsIdentity = (ClaimsIdentity)HttpContext.User.Identity;
                LoggedInUser loggedInUser = new LoggedInUser();

                if (claimsIdentity.Name == "")
                {
                    loggedInUser = null;
                }
                else
                {
                    if (claimsIdentity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault() != null)
                        loggedInUser.UserID = Convert.ToString(claimsIdentity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value);

                    if (claimsIdentity.Claims.Where(c => c.Type == "UserName").FirstOrDefault() != null)
                        loggedInUser.UserName = Convert.ToString(claimsIdentity.Claims.Where(c => c.Type == "UserName").FirstOrDefault().Value);
                    if (claimsIdentity.Claims.Where(c => c.Type == "FirstName").FirstOrDefault() != null)
                        loggedInUser.FirstName = Convert.ToString(claimsIdentity.Claims.Where(c => c.Type == "FirstName").FirstOrDefault().Value);
                    if (claimsIdentity.Claims.Where(c => c.Type == "LastName").FirstOrDefault() != null)
                        loggedInUser.LastName = Convert.ToString(claimsIdentity.Claims.Where(c => c.Type == "LastName").FirstOrDefault().Value);
                }
                return loggedInUser;
            }
        }
    }
}
