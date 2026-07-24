import { useState } from 'react';

type VendorFormState = {
    vendorName: string;
    gst: string;
    pan: string;
    vendorCategory: string;
    address: string;
    contactDetails: string;
    bankDetails: string;
    paymentTerms: string;
    certifications: string;
    documentsUpload: File | null;
};

type VendorFormErrorState = {
    vendorName: boolean;
    gst: boolean;
    pan: boolean;
    vendorCategory: boolean;
    address: boolean;
    contactDetails: boolean;
    bankDetails: boolean;
    paymentTerms: boolean;
    certifications: boolean;
    documentsUpload: boolean;
};

type TextFieldKey = Exclude<keyof VendorFormState, 'documentsUpload'>;

type FormDataProps = {
    onClose: () => void;
};

const FormData = ({ onClose }: FormDataProps) => {

    const [formData, setFormData] = useState<VendorFormState>({
        vendorName: '',
        gst: '',
        pan: '',
        vendorCategory: '',
        address: '',
        contactDetails: '',
        bankDetails: '',
        paymentTerms: '',
        certifications: '',
        documentsUpload: null as File | null,
    });

    const [formDataError, setFormDataError] = useState<VendorFormErrorState>({
        vendorName: false,
        gst: false,
        pan: false,
        vendorCategory: false,
        address: false,
        contactDetails: false,
        bankDetails: false,
        paymentTerms: false,
        certifications: false,
        documentsUpload: false,
    });


    const handleChange = (field: TextFieldKey, value: string) => {
        let sanitizedValue;
        if (field === 'gst' || field === 'contactDetails' || field === 'bankDetails') {
            sanitizedValue = value.replace(/[^0-9]/g, '');
        } else {
            sanitizedValue = value;
        }
        setFormData((prev) => ({
            ...prev,
            [field]: sanitizedValue,
        }));
        handleFormError(field, sanitizedValue);
    };

    const handleFormError = (field: TextFieldKey, value: string) => {
        setFormDataError((prev) => ({
            ...prev,
            [field]: value.trim() === '',
        }));
    }

    const handleFileChange = (file: File | null) => {
        setFormData((prev) => ({
            ...prev,
            documentsUpload: file,
        }));
        setFormDataError((prev) => ({
            ...prev,
            documentsUpload: file === null,
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
        onClose();
    }

    const isFormDataValid = Object.values(formDataError).some((error) => error) || Object.values(formData).some((value) => value === '' || value === null);

    return (
        <div className="">
            <div className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto mt-2">
                <div>
                    <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                    <input
                        type="text"
                        id="vendorName"
                        name="vendorName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.vendorName}
                        onChange={(e) => handleChange('vendorName', e.target.value)}
                    />
                    {formDataError.vendorName && <p className="text-red-500 text-sm mt-1">Vendor Name is required.</p>}
                </div>

                <div>
                    <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST</label>
                    <input
                        type="text"
                        id="gst"
                        name="gst"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.gst}
                        onChange={(e) => handleChange('gst', e.target.value)}
                    />
                    {formDataError.gst && <p className="text-red-500 text-sm mt-1">GST is required.</p>}
                </div>

                <div>
                    <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN</label>
                    <input
                        type="text"
                        id="pan"
                        name="pan"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.pan}
                        onChange={(e) => handleChange('pan', e.target.value)}
                    />
                    {formDataError.pan && <p className="text-red-500 text-sm mt-1">PAN is required.</p>}
                </div>

                <div>
                    <label htmlFor="vendorCategory" className="block text-sm font-medium text-gray-700">Vendor Category</label>
                    <select
                        id="vendorCategory"
                        name="vendorCategory"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.vendorCategory}
                        onChange={(e) => handleChange('vendorCategory', e.target.value)}
                    >
                        <option value="">Select category</option>
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Packaging">Packaging</option>
                    </select>
                    {formDataError.vendorCategory && <p className="text-red-500 text-sm mt-1">Vendor Category is required.</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                    {formDataError.address && <p className="text-red-500 text-sm mt-1">Address is required.</p>}
                </div>

                <div>
                    <label htmlFor="contactDetails" className="block text-sm font-medium text-gray-700">Contact Details</label>
                    <input
                        type="text"
                        id="contactDetails"
                        name="contactDetails"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.contactDetails}
                        onChange={(e) => handleChange('contactDetails', e.target.value)}
                    />
                    {formDataError.contactDetails && <p className="text-red-500 text-sm mt-1">Contact Details is required.</p>}
                </div>

                <div>
                    <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700">Bank Details</label>
                    <textarea
                        id="bankDetails"
                        name="bankDetails"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.bankDetails}
                        onChange={(e) => handleChange('bankDetails', e.target.value)}
                    />
                    {formDataError.bankDetails && <p className="text-red-500 text-sm mt-1">Bank Details is required.</p>}
                </div>

                <div>
                    <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
                    <input
                        type="text"
                        id="paymentTerms"
                        name="paymentTerms"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.paymentTerms}
                        onChange={(e) => handleChange('paymentTerms', e.target.value)}
                    />
                    {formDataError.paymentTerms && <p className="text-red-500 text-sm mt-1">Payment Terms is required.</p>}
                </div>

                <div>
                    <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications</label>
                    <input
                        type="text"
                        id="certifications"
                        name="certifications"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.certifications}
                        onChange={(e) => handleChange('certifications', e.target.value)}
                    />
                    {formDataError.certifications && <p className="text-red-500 text-sm mt-1">Certifications is required.</p>}
                </div>

                <div>
                    <label htmlFor="documentsUpload" className="block text-sm font-medium text-gray-700">Documents Upload</label>
                    <input
                        type="file"
                        id="documentsUpload"
                        name="documentsUpload"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                    />
                    {formDataError.documentsUpload && <p className="text-red-500 text-sm mt-1">Document upload is required.</p>}
                </div>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isFormDataValid} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default FormData

