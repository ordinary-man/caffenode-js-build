const path = require('path');
const os = require('os');

const {
    isOSX
} = require('./plateform');

//////////////////// CV ///////////////////////
const rootDir = __dirname;
const opencvRoot = path.join(rootDir, 'opencv');
const opencvSrc = path.join(opencvRoot, 'opencv');
const opencvModules = [
    'core',
    'highgui',
    'imgcodecs',
    'imgproc',
    'features2d',
    'calib3d',
    'photo',
    'objdetect',
    'ml',
    'video',
    'videoio',
    'videostab',
    'dnn',
    'face',
    'text',
    'tracking',
    'xfeatures2d',
    'ximgproc'
]
const opencvContribSrc = path.join(opencvRoot, 'opencv_contrib');
const opencvContribModules = path.join(opencvContribSrc, 'modules');
const opencvBuild = path.join(opencvRoot, 'build');
const opencvInclude = path.join(opencvBuild, 'include');
const opencvLibDir = path.join(opencvBuild, 'lib');
const opencvBinDir = path.join(opencvBuild, 'bin');
const opencvTag = '3.4.1';
const opencvRepo = 'https://github.com/opencv/opencv.git';
const opencvContribRepo = 'https://github.com/opencv/opencv_contrib.git';

//////////////////// CAFFE ///////////////////////
const caffeRoot = path.join(rootDir, 'caffe');
const caffeSrc = path.join(caffeRoot, 'caffe');
const caffeBuild = path.join(caffeSrc, 'build');
const caffeInclude = path.join(caffeSrc, 'include');
const caffeLibDir = path.join(caffeBuild, 'lib');
const caffeProtoDir = path.join(caffeSrc, '/src/caffe/proto/')
const caffeRepo = 'https://github.com/BVLC/caffe.git';
const caffeDependeciesLinux = [
    'libsnappy-dev',
    'libatlas-base-dev',
    'libboost-all-dev',
    'libgflags-dev',
    'libprotobuf-dev',
    'protobuf-compiler',
    'libgoogle-glog-dev',
    'libhdf5-serial-dev',
    'libleveldb-dev',
    'liblmdb-dev',
    'libatlas-base-dev',
    'libboost-all-dev',
    'git',
    'cmake',
    'tar'
];
const caffeDependeciesDarvin = [
    'snappy',
    'gflags',
    'szip',
    'libtool',
    'protobuf',
    'glog',
    'hdf5',
    'openblas',
    'boost',
    'webp' // opencv 3 dependecy
];
const caffeMakeFileReplacements = [
    // CUSTOM_CXX
    {
        original: '# CUSTOM_CXX := g++',
        replace: 'CUSTOM_CXX := /usr/bin/g++'
    },
    // USE_OPENCV
    {
        original: '# USE_OPENCV := 0',
        replace: ' USE_OPENCV := 0'
    },
    // USE_CUDNN
    {
        original: '# USE_CUDNN := 1',
        replace: ' USE_CUDNN := 1'
    },
    // todo-check version of cuda before replacement
    // -gencode arch=compute_20,code=sm_20 \
    {
        original: '-gencode arch=compute_20,code=sm_20 \\',
        replace: '\\'
    },
    // -gencode arch=compute_20,code=sm_21 \
    {
        original: '-gencode arch=compute_20,code=sm_21 \\',
        replace: '\\'
    },
    // INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include
    {
        original: 'INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include',
        replace: 'INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /usr/include/hdf5/serial/'
    },
    // LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib
    {
        original: 'LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib',
        replace: 'LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib /usr/lib/x86_64-linux-gnu/hdf5/serial/'
    },
    // BUILD_DIR := build
    /* {
         original: 'BUILD_DIR := build',
         replace: `BUILD_DIR := ${caffeBuild}`
     },*/
    // # OPENCV_VERSION := 3
    {
        original: '# OPENCV_VERSION := 3',
        replace: ' OPENCV_VERSION := 3'
    }
]
const caffeModules = [
    'caffe'
]

//////////////////// CUDA ///////////////////////
const cudaInclude = isOSX() ? '/Library/Frameworks/CUDA' : '/usr/local/cuda';
const cuDnnInclude = `${cudaInclude}/include`;

//////////////////// NCCL ///////////////////////
const ncclRoot = path.join(rootDir, 'nccl')
const ncclSrc = path.join(ncclRoot, 'nccl')
const ncclBuild = path.join(ncclRoot, 'build');
const ncclInclude = path.join(ncclBuild, 'include');
const ncclLibDir = path.join(ncclBuild, 'lib');
const ncclBinDir = path.join(ncclBuild, 'bin');
const ncclRepo = 'https://github.com/NVIDIA/nccl.git';
const ncclModules = ['nccl'];

//////////////////// PROTOBUF ///////////////////////
const protobufRoot = path.join(rootDir, 'protobuf');
const protobufSrc = path.join(protobufRoot, 'protobuf');
const protobufBuild = path.join(protobufSrc, 'src/');
const protobufInclude = path.join(protobufBuild, 'google/protobuf/');
const protobufLibDir = path.join(protobufBuild, '.lib');
const protobufBinDir = path.join(protobufBuild, '.deps');
const protobufTarPath = 'https://github.com/google/protobuf/releases/download/v2.5.0/protobuf-2.5.0.tar.gz';
const protobufTarName = protobufTarPath.split('/').pop();
const protobufModules = ['protobuf', 'protobuf-lite'];

module.exports = {
    rootDir,
    /**
     * OPENCV CONFIG
     */
    opencvRoot,
    opencvSrc,
    opencvModules,
    /**
     * OPENCV CONTRIB CONFIG
     */
    opencvContribSrc,
    opencvContribModules,
    /**
     * OPENCV BUILD
     */
    opencvBuild,
    opencvInclude,
    opencvLibDir,
    opencvBinDir,
    /**
     * OPENCV REPO
     */
    opencvTag,
    opencvRepo,
    opencvContribRepo,
    /**
     * CUDA + CUDNN CONFIG
     */
    cudaInclude,
    cuDnnInclude,
    /**
     * NCCL CONFIG
     */
    ncclRoot,
    ncclSrc,
    ncclBuild,
    ncclInclude,
    ncclLibDir,
    ncclBinDir,
    ncclRepo,
    ncclModules,
    /**
     * PROTOBUF CONFIG
     */
    protobufRoot,
    protobufSrc,
    protobufBuild,
    protobufInclude,
    protobufLibDir,
    protobufBinDir,
    protobufTarPath,
    protobufTarName,
    protobufModules,
    caffeProtoDir,
    /**
     * CAFFE CONFIG
     */
    caffeRoot,
    caffeSrc,
    /**
     * CAFFE BUILD
     */
    caffeBuild,
    caffeInclude,
    caffeLibDir,
    /**
     * CAFFE DEPENDENCIES
     */
    caffeRepo,
    caffeDependeciesLinux,
    caffeDependeciesDarvin,
    caffeMakeFileReplacements,
    /**
     * OTHERS
     */
    numberOfCores: os.cpus().length,
}