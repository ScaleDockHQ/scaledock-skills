# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Generic Sensor API

Source: https://www.w3.org/TR/generic-sensor/

This specification defines a framework for exposing sensor data to the Open Web Platform in a consistent way. It does so by defining a blueprint for writing specifications of concrete sensors along with an abstract Sensor interface that can be extended to accommodate different sensor types.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. Scope.** This should have little to no effects on implementations, however.
- **4. Security and privacy considerations.** Web application developers using these JavaScript APIs should consider how this information might be correlated with other information and the privacy risks that might be created.
- **4. Security and privacy considerations.** The potential risks of collection of such data over a longer period of time should also be considered.
- **4. Security and privacy considerations.** User agents should not provide unnecessarily verbose readouts of sensors data.
- **4. Security and privacy considerations.** Each sensor type should be assessed individually.
- **4. Security and privacy considerations.** User agents should consider providing the user an indication of when the sensor is used and allowing the user to disable it.
- **4. Security and privacy considerations.** Web application developers that use sensors should perform a privacy impact assessment of their application taking all aspects of their application into consideration.

## Accelerometer

Source: https://www.w3.org/TR/accelerometer/

This specification defines Accelerometer , LinearAccelerationSensor and GravitySensor interfaces for obtaining information about acceleration applied to the X, Y and Z axis of a device that hosts the sensor.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **6.1. Accelerometer.** The frame of reference for the acceleration measurement must be inertial, such as, the device in free fall would provide 0 (m/s 2 ) acceleration value for each axis.
- **6.1. Accelerometer.** The sign of the acceleration values must be according to the right-hand convention in a local coordinate system (see figure below).
- **9.3. Gravity automation.** The per-type virtual sensor metadata map must have the following entry : key " gravity " value A virtual sensor metadata whose reading parsing algorithm is parse xyz reading .
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Gyroscope

Source: https://www.w3.org/TR/gyroscope/

This specification defines a concrete sensor interface to monitor the rate of rotation around the device’s local three primary axes.

- **11. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC 2119.
- **6. Model.** The sign of the current angular velocity depends on the rotation direction and it must be according to the right-hand convention in a local coordinate system defined by the device, such that positive rotation around an axis is clockwise when viewed along the positive direction of the axis (see figure below).
- **11. Conformance.** [RFC2119] A conformant user agent must implement all the requirements listed in this specification that are applicable to user agents.
- **11. Conformance.** The IDL fragments in this specification must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.

## Magnetometer

Source: https://www.w3.org/TR/magnetometer/

This specification defines a concrete sensor interface to measure magnetic field in the X, Y and Z axis.

- **13. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3. Security and Privacy Considerations.** Implementors should be aware of potential risk of side-channel leaks via the correlations of magnetic field strength and other aspects such as CPU execution, which under certain circumstances may potentially leak the information about used applications or websites visited in other tabs.
- **3. Security and Privacy Considerations.** To mitigate these specific threats, user agents should use one or both of the following mitigation strategies: limit maximum sampling frequency reduce accuracy of sensor readings These mitigation strategies complement the generic mitigations defined in the Generic Sensor API [GENERIC-SENSOR] .
- **5. Model.** Virtual sensor type " magnetometer " The latest reading for a Sensor whose sensor type is Magnetometer must include: Three entries whose keys are "x", "y", "z" and whose values contain magnetic field about the corresponding axes.
- **5. Model.** Virtual sensor type " uncalibrated-magnetometer " The latest reading for a Sensor whose sensor type is Uncalibrated Magnetometer must include: Three entries whose keys are "x", "y", "z" and whose values contain uncalibrated magnetic field around the 3 different axes.
- **5. Model.** The sign of the magnetic field values must be according to the right-hand convention in a local coordinate system (see figure below).
- **8.1. Magnetometer automation.** The per-type virtual sensor metadata map must have the following entry : key " magnetometer " value A virtual sensor metadata whose reading parsing algorithm is parse XYZ reading .
- **8.2. Uncalibrated Magnetometer automation.** The per-type virtual sensor metadata map must have the following entry : key " uncalibrated-magnetometer " value A virtual sensor metadata whose reading parsing algorithm is the uncalibrated magnetometer reading parsing algorithm .

## Orientation Sensor

Source: https://www.w3.org/TR/orientation-sensor/

This specification defines a base orientation sensor interface and concrete sensor subclasses to monitor the device’s physical orientation in relation to a stationary three dimensional Cartesian coordinate system.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **5. Model.** To access the Orientation Sensor sensor type ’s latest reading , the user agent must invoke request sensor access abstract operation for each of the low-level sensors used by the concrete orientation sensor.
- **6.2. The AbsoluteOrientationSensor Interface.** [ SecureContext , Exposed = Window ] interface AbsoluteOrientationSensor : OrientationSensor { constructor ( optional OrientationSensorOptions sensorOptions = {}); }; To construct an AbsoluteOrientationSensor object the user agent must invoke the construct an orientation sensor object abstract operation for the AbsoluteOrientationSensor interface.
- **6.3. The RelativeOrientationSensor Interface.** [ SecureContext , Exposed = Window ] interface RelativeOrientationSensor : OrientationSensor { constructor ( optional OrientationSensorOptions sensorOptions = {}); }; To construct a RelativeOrientationSensor object the user agent must invoke the construct an orientation sensor object abstract operation for the RelativeOrientationSensor interface.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Ambient Light Sensor

Source: https://www.w3.org/TR/ambient-light/

This specification defines a concrete sensor interface to monitor the ambient light level or illuminance of the device’s environment.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3. Security and Privacy Considerations.** To mitigate these threats specific to Ambient Light Sensor, user agents must reduce accuracy of sensor readings.
- **3.1. Reducing sensor readings accuracy.** Implementations must adhere to the following requirements for their values: The illuminance rounding multiple must be at least 50 lux.
- **3.1. Reducing sensor readings accuracy.** The illuminance threshold value should be at least half of the illuminance rounding multiple .
- **5.1. The AmbientLightSensor Interface.** illuminance ; }; To construct an AmbientLightSensor object the user agent must invoke the construct an ambient light sensor object abstract operation.
- **7. Automation.** The illuminance reading parsing algorithm , given a JSON Object parameters , must return the result of invoking parse single-value number reading with parameters and " illuminance ".
- **7. Automation.** The per-type virtual sensor metadata map must have the following entry : key " ambient-light " value A virtual sensor metadata whose reading parsing algorithm is illuminance reading parsing algorithm .
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Proximity Sensor

Source: https://www.w3.org/TR/proximity/

This specification defines a concrete sensor interface to monitor the presence of nearby physical objects without physical contact.

- **11. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3. Security and Privacy Considerations.** To mitigate these, user agents should use one or both of the following mitigation strategies : reduce accuracy of a sensor reading limit maximum sampling frequency These mitigation strategies complement the generic mitigations defined in the Generic Sensor API [GENERIC-SENSOR] .
- **6.1. The ProximitySensor Interface.** near ; }; To construct a ProximitySensor object the user agent must invoke the construct a proximity sensor object abstract operation.
- **6.1.1. The distance attribute.** If the physical object is outside the sensing range , the attribute must return null.
- **8. Automation.** The per-type virtual sensor metadata map must have the following entry : key " proximity " value A virtual sensor metadata whose reading parsing algorithm is the proximity reading parsing algorithm .
- **9. Limitations of Proximity Sensors.** As such, proximity sensors should not be relied on as a means to measure distance.
- **11. Conformance.** [RFC2119] A conformant user agent must implement all the requirements listed in this specification that are applicable to user agents.
- **11. Conformance.** The IDL fragments in this specification must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
