package portfolios.controllers

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

class SampleResponse(val say: String, val who: String)

@Path("/hello-world")
@Produces(MediaType.APPLICATION_JSON)
class SampleResource {

    @GET
    fun hello(): SampleResponse {
        return SampleResponse(say="Hello", who="World")
    }

}