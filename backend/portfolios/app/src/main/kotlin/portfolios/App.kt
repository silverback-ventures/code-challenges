package portfolios

import io.dropwizard.Application
import io.dropwizard.jdbi3.JdbiFactory
import io.dropwizard.setup.Environment
import portfolios.controllers.SampleResource
import portfolios.services.Db
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

        // database initialization
        val factory = JdbiFactory()
        val jdbi = factory.build(environment, configuration.database, "sqlite")
        val db = Db(jdbi)
        require(db.selectOne() == 1) {
            "database is working"
        }

        // register jersey resources
        environment.jersey().register(SampleResource())

        logger.info("application ${configuration.appName} running")
    }
}