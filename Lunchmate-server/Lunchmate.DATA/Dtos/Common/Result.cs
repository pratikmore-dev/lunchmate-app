using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lunchmate.Data.Dtos
{
    public class Result<T>
    {
        public ResultType Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public List<string> Errors { get; private set; } = new List<string>();

        public Result() { }

        public Result(ResultType status, string message, T data)
        {
            Status = status;
            Message = message;
            Data = data;
        }

        public Result(ResultType status, string message)
        {
            Status = status;
            Message = message;
        }

        public static Result<T> Failure(string message, List<string>? errors = null)
        {
            return new Result<T>
            {
                Status = ResultType.Fail,
                Message = message,
                Errors = errors ?? new List<string>()
            };
        }


        public static Result<T> Success(T data)
        {
            return new Result<T> { Status = ResultType.Success, Data = data };
        }
    }

    public enum ResultType
    {
        Success = 1,
        Fail = 2,
        NotFound = 3
    }

}
