package lk.Laknaw_Bookshop.privilege;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ModuleController {

    @Autowired
    private ModuleDao dao;

    @GetMapping(value = "/module/alldata", produces = "application/json")
    public List<Module> allModuleList() {
        return dao.findAll();
    }
}
