package lk.Laknaw_Bookshop.employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeDao extends JpaRepository<Employee, Integer> {

    @Query("select e from Employee e where e.nic=?1")
    Employee getByNic(String nic);

    @Query("select e from Employee e where e.email=?1")
    Employee getByEmail(String email);

    @Query(value = "SELECT lpad(max(e.empnum)+1,3,0) FROM laknaw_bookshop.employee as e;", nativeQuery = true)
    String getNextEmployeeNumber();

    @Query("select e from Employee e where e.id not in(SELECT u.employee_id.id from User u)")
    List<Employee> getListByWithOutUserAccount();

}
