package com.AmsSpringBoot.service;

import com.AmsSpringBoot.bean.Carrier;
import com.AmsSpringBoot.dao.CarrierDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrierService {

    public boolean addCarrier(Carrier carrier) {
        return CarrierDAO.insertCarrier(carrier) > 0;
    }

    public boolean updateCarrier(Carrier carrier) {
        return CarrierDAO.updateCarrier(carrier);
    }

    public boolean deleteCarrier(int id) {
        return CarrierDAO.deleteCarrier(id);
    }

    public List<Carrier> getAllCarriers() {
        return CarrierDAO.getAllCarriers();
    }
    
    public Carrier getCarrierById(int id) {
        return CarrierDAO.getCarrierById(id);
    }
    
    public int addCarriers(List<Carrier> list) {
        int count = 0;
        for (Carrier c : list) {
            if (CarrierDAO.insertCarrier(c) > 0) {
                count++;
            }
        }
        return count;
    }
}
