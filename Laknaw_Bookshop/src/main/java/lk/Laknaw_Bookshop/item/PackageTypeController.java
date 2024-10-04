package lk.Laknaw_Bookshop.item;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PackageTypeController {

    @Autowired
    private PackageTypeDao packagetypedao;

    @GetMapping(value = "/packagetype/alldata", produces = "application/json")
    public List<Packagetype> allPackageTypeList() {
        return packagetypedao.findAll();
    }
}
