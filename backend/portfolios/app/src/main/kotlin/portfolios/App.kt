package portfolios

import io.dropwizard.Application
import io.dropwizard.setup.Environment
import portfolios.controllers.SampleResource
import java.util.logging.Logger

class App: Application<AppConfig>() {
    private val logger = Logger.getLogger(App::class.java.name)

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            App().run(*args)
        }
    }

    override fun run(configuration: AppConfig?, environment: Environment?) {
        require(configuration != null && environment != null)

        environment.jersey().register(SampleResource())

        logger.info("application ${configuration.appName} running")
    }
}