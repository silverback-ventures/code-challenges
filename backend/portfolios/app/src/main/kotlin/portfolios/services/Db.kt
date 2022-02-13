package portfolios.services

import org.jdbi.v3.core.Jdbi

class Db(private val jdbi: Jdbi) {

    fun selectOne(): Int {
        return jdbi.withHandle<Int, java.lang.Exception> {
            it.createQuery("SELECT (:id)")
                .bind("id", "1")
                .mapTo(Int::class.java)
                .findOne().get()
        }
    }
}