# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Portable Network Graphics (PNG) Specification (Third Edition) Level 3

Source: https://www.w3.org/TR/png-3/

This document describes PNG (Portable Network Graphics), an extensible file format for the lossless , portable, well-compressed storage of static and animated raster images. PNG provides a patent-free replacement for GIF and can also replace many common uses of TIFF. Indexed-color , greyscale , and truecolor images are supported, plus an optional alpha channel. Sample depths range from 1 to 16 bits. PNG is designed to work well in online viewing applications, such as the World Wide Web, so it is fully streamable with a progressive display option. PNG is robust, providing both full file integrity checking and simple detection of common transmission errors. Also, PNG can store color space data

- **5.7.1 General.** All chunks, private and public, SHOULD be listed at [ PNG-EXTENSIONS ].
- **5.7.2 Defining public chunks.** A proposed public chunk type SHALL not be used in publicly available software or datastreams until defined as such.
- **5.7.3 Defining private chunks.** A private chunk SHOULD NOT be defined merely to carry textual information of interest to a human user.
- **5.7.3 Defining private chunks.** Instead iTXt chunk SHOULD BE used and corresponding keyword SHOULD BE used and a suitable keyword defined.
- **5.7.3 Defining private chunks.** If a private chunk type is used, additional identifying information SHOULD BE be stored at the beginning of the chunk data to further reduce the risk of conflicts.
- **5.7.3 Defining private chunks.** An ancillary chunk type, not a critical chunk type, SHOULD be used for all private chunks that store information that is not absolutely essential to view the image.
- **5.7.3 Defining private chunks.** Private critical chunks SHOULD NOT be defined because PNG datastreams containing such chunks are not portable, and SHOULD NOT be used in publicly available software or datastreams.
- **5.7.3 Defining private chunks.** If a private critical chunk is essential for an application, it SHOULD appear near the start of the datastream, so that a standard decoder need not read very far before discovering that it cannot handle the datastream.

## Portable Network Graphics (PNG) Specification (Second Edition) Level 2

Source: https://www.w3.org/TR/PNG/

This document describes PNG (Portable Network Graphics), an extensible file format for the lossless , portable, well-compressed storage of static and animated raster images. PNG provides a patent-free replacement for GIF and can also replace many common uses of TIFF. Indexed-color , greyscale , and truecolor images are supported, plus an optional alpha channel. Sample depths range from 1 to 16 bits. PNG is designed to work well in online viewing applications, such as the World Wide Web, so it is fully streamable with a progressive display option. PNG is robust, providing both full file integrity checking and simple detection of common transmission errors. Also, PNG can store color space data

- **5.7.1 General.** All chunks, private and public, SHOULD be listed at [ PNG-EXTENSIONS ].
- **5.7.2 Defining public chunks.** A proposed public chunk type SHALL not be used in publicly available software or datastreams until defined as such.
- **5.7.3 Defining private chunks.** A private chunk SHOULD NOT be defined merely to carry textual information of interest to a human user.
- **5.7.3 Defining private chunks.** Instead iTXt chunk SHOULD BE used and corresponding keyword SHOULD BE used and a suitable keyword defined.
- **5.7.3 Defining private chunks.** If a private chunk type is used, additional identifying information SHOULD BE be stored at the beginning of the chunk data to further reduce the risk of conflicts.
- **5.7.3 Defining private chunks.** An ancillary chunk type, not a critical chunk type, SHOULD be used for all private chunks that store information that is not absolutely essential to view the image.
- **5.7.3 Defining private chunks.** Private critical chunks SHOULD NOT be defined because PNG datastreams containing such chunks are not portable, and SHOULD NOT be used in publicly available software or datastreams.
- **5.7.3 Defining private chunks.** If a private critical chunk is essential for an application, it SHOULD appear near the start of the datastream, so that a standard decoder need not read very far before discovering that it cannot handle the datastream.

## Portable Network Graphics (PNG) Specification Level 1

Source: https://www.w3.org/TR/PNG/

This document describes PNG (Portable Network Graphics), an extensible file format for the lossless , portable, well-compressed storage of static and animated raster images. PNG provides a patent-free replacement for GIF and can also replace many common uses of TIFF. Indexed-color , greyscale , and truecolor images are supported, plus an optional alpha channel. Sample depths range from 1 to 16 bits. PNG is designed to work well in online viewing applications, such as the World Wide Web, so it is fully streamable with a progressive display option. PNG is robust, providing both full file integrity checking and simple detection of common transmission errors. Also, PNG can store color space data

- **5.7.1 General.** All chunks, private and public, SHOULD be listed at [ PNG-EXTENSIONS ].
- **5.7.2 Defining public chunks.** A proposed public chunk type SHALL not be used in publicly available software or datastreams until defined as such.
- **5.7.3 Defining private chunks.** A private chunk SHOULD NOT be defined merely to carry textual information of interest to a human user.
- **5.7.3 Defining private chunks.** Instead iTXt chunk SHOULD BE used and corresponding keyword SHOULD BE used and a suitable keyword defined.
- **5.7.3 Defining private chunks.** If a private chunk type is used, additional identifying information SHOULD BE be stored at the beginning of the chunk data to further reduce the risk of conflicts.
- **5.7.3 Defining private chunks.** An ancillary chunk type, not a critical chunk type, SHOULD be used for all private chunks that store information that is not absolutely essential to view the image.
- **5.7.3 Defining private chunks.** Private critical chunks SHOULD NOT be defined because PNG datastreams containing such chunks are not portable, and SHOULD NOT be used in publicly available software or datastreams.
- **5.7.3 Defining private chunks.** If a private critical chunk is essential for an application, it SHOULD appear near the start of the datastream, so that a standard decoder need not read very far before discovering that it cannot handle the datastream.
